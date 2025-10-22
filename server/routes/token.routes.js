import { Router } from "express";
import { refresh, verifyToken } from "../controllers/token.controller.js";

const tokenRouter = Router();

tokenRouter.post("/refresh", refresh);
tokenRouter.post("/verify-token", verifyToken);

export default tokenRouter;
