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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "No tokens provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);

      // Ambil role dari database
      const user = await User.findById(decoded.userId).select("role");
      if (!user) return res.status(404).json({ message: "User not found" });

      // Simpan di req.user untuk route lain
      req.user = { id: decoded.userId, role: user.role };

      // Kirim response dengan role
      return res.status(200).json({
        valid: true,
        role: user.role, // <-- frontend bisa pakai data.role
      });
    } catch (err) {
      // accessToken tidak valid atau expired, lanjut ke refreshToken
    }

    // 2️⃣ Jika accessToken invalid, periksa refreshToken
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });

    // Cek apakah refreshToken ada di database
    const tokenDoc = await refreshTokenModel.findOne({ token: refreshToken });
    if (!tokenDoc)
      return res.status(403).json({ message: "Invalid refresh token" });

    // Cek apakah refreshToken sudah expired
    if (tokenDoc.expiresAt < new Date()) {
      await refreshTokenModel.deleteOne({ token: refreshToken });
      return res.status(403).json({ message: "Refresh token expired" });
    }

    // 3️⃣ Verifikasi refreshToken dan buat accessToken baru
    const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decodedRefresh.userId },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const user = await User.findById(decodedRefresh.userId).select("role");
    req.user = { id: decodedRefresh.userId, role: user.role };
    console.log(user);
    // return res.status(200).json({ valid: true, role: user.role });

    return res
      .status(200)
      .json({ valid: true, renewed: true, role: user.role });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
