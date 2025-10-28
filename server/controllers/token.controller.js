import jwt from "jsonwebtoken";
import {
  ACCESS_EXPIRES,
  ACCESS_SECRET,
  REFRESH_SECRET,
} from "../config/env.js";
import refreshTokenModel from "../models/refreshToken.model.js";
import User from "../models/user.model.js";

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // ✅ Cek apakah accessToken masih valid
    if (accessToken) {
      try {
        jwt.verify(accessToken, ACCESS_SECRET);
        // Kalau tidak error berarti masih valid
        return res.status(200).json({
          message: "Access token still valid",
          accessToken,
        });
      } catch (err) {
        // Kalau error karena expired, lanjut refresh
        if (err.name !== "TokenExpiredError") {
          // error lain (misal token rusak)
          return res.status(403).json({ message: "Invalid access token" });
        }
        // kalau expired, lanjut ke bawah
      }
    }

    // ✅ Verifikasi refresh token
    const tokenDoc = await refreshTokenModel.findOne({ token: refreshToken });
    if (!tokenDoc)
      return res.status(403).json({ message: "Invalid refresh token" });
    if (tokenDoc.expiresAt < new Date()) {
      await refreshTokenModel.deleteOne({ token: refreshToken });
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // ✅ Buat accessToken baru
    const newAccessToken = jwt.sign({ userId: decoded.userId }, ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.body;

    // const accessToken = req.cookies.accessToken;
    // const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "No tokens provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);

      const user = await User.findById(decoded.userId).select("role");
      if (!user) return res.status(404).json({ message: "User not found" });

      req.user = { id: decoded.userId, role: user.role };

      return res.status(200).json({
        valid: true,
        role: user.role,
      });
    } catch (err) {
      //
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const tokenDoc = await refreshTokenModel.findOne({ token: refreshToken });
    if (!tokenDoc) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (tokenDoc.expiresAt < new Date()) {
      await refreshTokenModel.deleteOne({ token: refreshToken });
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decodedRefresh.userId },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    );

    res.cookie("accessToken", newAccessToken, {
      // httpOnly: true,
      // secure: NODE_ENV === "production",
      // path: "/",
      httpOnly: true,
      secure: true,
    });

    const user = await User.findById(decodedRefresh.userId).select("role");
    req.user = { id: decodedRefresh.userId, role: user.role };

    return res.status(200).json({
      valid: true,
      renewed: true,
      accessToken: newAccessToken,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};
