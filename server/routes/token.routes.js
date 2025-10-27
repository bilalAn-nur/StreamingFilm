import { Router } from "express";
import {
  getIdUserByToken,
  refresh,
  verifyToken,
} from "../controllers/token.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const tokenRouter = Router();

tokenRouter.post("/get-id", authorize, getIdUserByToken);
tokenRouter.post("/verify-token", verifyToken);
tokenRouter.post("/refresh", refresh);

export default tokenRouter;
