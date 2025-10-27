import { Router } from "express";
import { refresh, verifyToken } from "../controllers/token.controller.js";

const tokenRouter = Router();

// tokenRouter.post("/get-id", authorize, getIdUserByToken);
tokenRouter.post("/verify-token", verifyToken);
tokenRouter.post("/refresh", refresh);

export default tokenRouter;
