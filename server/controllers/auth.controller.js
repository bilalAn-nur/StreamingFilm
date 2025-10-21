// import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  NODE_ENV,
  REFRESH_MAX_AGE,
} from "../config/env.js";
import { generateRefreshTokenPlain, hashToken } from "../utils/token.utils.js";
import refreshTokenModel from "../models/refreshToken.model.js";

export const signup = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const {
      name,
      email,
      password,
      role,
      profilePicture,
      phoneNumber,
      address,
      gender,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 409;
      throw error;
    }

    // Hash password (you can use bcrypt or any other library)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          role,
          profilePicture,
          phoneNumber,
          address,
          gender,
        },
      ]
      // { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // await session.commitTransaction();
    // session.endSession();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found with this email");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    // Access Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Refresh Token
    const refreshPlain = generateRefreshTokenPlain();
    const refreshHashed = hashToken(refreshPlain);
    const expiresAt = new Date(Date.now() + REFRESH_MAX_AGE);

    await refreshTokenModel.create({
      token: refreshHashed,
      user: user._id,
      expiresAt,
    });

    res.cookie("refreshToken", refreshPlain, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_MAX_AGE,
      path: "/auth",
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const plain = req.cookies?.refreshToken;
    if (plain) {
      const hashed = hashToken(plain);
      await refreshTokenModel.findOneAndUpdate(
        { token: hashed },
        { revoked: true }
      );
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth",
      });
    }
    return res.status(200).json({ success: true, message: "Signed out" });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const plain = req.cookies?.refreshToken;
    if (!plain)
      return res
        .status(401)
        .json({ success: false, message: "No refresh token" });

    const hashed = hashToken(plain);
    const dbToken = await refreshTokenModel.findOne({
      token: hashed,
      revoked: false,
    });
    if (!dbToken || dbToken.expiresAt < new Date()) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired refresh token" });
    }

    // rotate refresh token: revoke old, create new
    dbToken.revoked = true;
    await dbToken.save();

    const newPlain = generateRefreshTokenPlain();
    const newHashed = hashToken(newPlain);
    const newExpiresAt = new Date(Date.now() + REFRESH_MAX_AGE);
    await refreshTokenModel.create({
      token: newHashed,
      user: dbToken.user,
      expiresAt: newExpiresAt,
    });

    // issue new access token
    const accessToken = jwt.sign({ userId: dbToken.user }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // set cookie baru
    res.cookie("refreshToken", newPlain, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_MAX_AGE,
      path: "/auth",
    });

    return res.status(200).json({ success: true, accessToken });
  } catch (err) {
    next(err);
  }
};
