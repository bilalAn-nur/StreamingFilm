import jwt from "jsonwebtoken";
import {
  ACCESS_EXPIRES,
  ACCESS_SECRET,
  REFRESH_SECRET,
} from "../config/env.js";
import refreshTokenModel from "../models/refreshToken.model.js";

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const tokenDoc = await refreshTokenModel.findOne({ token });
    if (!tokenDoc)
      return res.status(403).json({ message: "Invalid refresh token" });
    if (tokenDoc.expiresAt < new Date()) {
      await refreshTokenModel.deleteOne({ token });
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const decoded = jwt.verify(token, REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, ACCESS_SECRET);
    res.status(200).json({ valid: true });
  } catch (err) {
    next(err);
  }
};
