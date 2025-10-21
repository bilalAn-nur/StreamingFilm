// /middleware/authorize.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import {
  ACCESS_EXPIRES,
  ACCESS_SECRET,
  REFRESH_SECRET,
} from "../config/env.js";

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let accessToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!accessToken)
      return res.status(401).json({ message: "No access token" });

    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") throw err;

      // Jika access token expired, cek refresh token
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(401).json({ message: "No refresh token" });

      const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
      if (!tokenDoc)
        return res.status(403).json({ message: "Invalid refresh token" });
      if (tokenDoc.expiresAt < new Date()) {
        await RefreshToken.deleteOne({ token: refreshToken });
        return res.status(403).json({ message: "Refresh token expired" });
      }

      const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET);
      const user = await User.findById(decodedRefresh.userId).select();
      if (!user) return res.status(401).json({ message: "User not found" });

      const newAccessToken = jwt.sign({ userId: user._id }, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES,
      });
      res.setHeader("x-access-token", newAccessToken);

      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
