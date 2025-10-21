import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdByIp: String,
  userAgent: String,
  revoked: { type: Boolean, default: false },
  replacedByToken: String,
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshToken", refreshTokenSchema);
