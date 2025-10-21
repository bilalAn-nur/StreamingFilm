import crypto from "crypto";

export const generateRefreshTokenPlain = (bytes = 64) =>
  crypto.randomBytes(bytes).toString("hex");

export const hashToken = (plain) =>
  crypto.createHash("sha256").update(plain).digest("hex");
