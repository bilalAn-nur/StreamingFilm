// import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ACCESS_SECRET,
  ACCESS_EXPIRES,
  REFRESH_SECRET,
  REFRESH_EXPIRES,
  NODE_ENV,
} from "../config/env.js";
import refreshTokenModel from "../models/refreshToken.model.js";

export const signup = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const { name, email, password } = req.body;

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
          role: "user",
        },
      ]
      // { session }
    );

    const accessToken = jwt.sign({ userId: newUsers[0]._id }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES,
    });
    const refreshToken = jwt.sign({ userId: newUsers[0]._id }, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES,
    });

    await refreshTokenModel.create({
      token: refreshToken,
      userId: newUsers[0]._id,
      userAgent: req.headers["user-agent"] || "unknown",
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // await session.commitTransaction();
    // session.endSession();
    res.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      // path: "/",
      httpOnly: true,
      secure: true,
    });

    res.cookie("accessToken", accessToken, {
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      // path: "/",
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        accessToken,
        refreshToken,
        user: newUsers[0],
      },
    });
  } catch (error) {
    next(error);
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
      const error = new Error("Password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    // Access Token
    const accessToken = jwt.sign({ userId: user._id }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES,
    });
    // Refresh Token
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES,
    });

    // Simpan refresh token dengan info device/IP
    await refreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
      userAgent: req.headers["user-agent"] || "unknown",
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      // path: "/",
      httpOnly: true,
      secure: true,
    });

    res.cookie("accessToken", accessToken, {
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      // path: "/",
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        accessToken,
        refreshToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      const error = new Error("Token Not Found");
      error.statusCode = 404;
      throw error;
    }

    const findToken = await refreshTokenModel.findOne({ token });
    if (!findToken) {
      const error = new Error("Refresh Token Not Found!!");
      error.statusCode = 404;
      throw error;
    }

    await refreshTokenModel.deleteOne({ token });
    res.clearCookie("refreshToken", {
      // path: "/",
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      httpOnly: true,
      secure: true,
    });

    res.clearCookie("accessToken", {
      // path: "/",
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
