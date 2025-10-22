import { Router } from "express";
import { verifyToken } from "../controllers/token.controller.js";

const tokenRouter = Router();

tokenRouter.post("/verify-token", verifyToken);

export default tokenRouter;
