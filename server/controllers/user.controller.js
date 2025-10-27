import { ACCESS_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const accessToken = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(accessToken, ACCESS_SECRET);
    } catch (err) {
      next(err);
    }

    const user = await User.findById(decoded.userId).select(
      "-_id -password -__v -createdAt -updatedAt"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      valid: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};
