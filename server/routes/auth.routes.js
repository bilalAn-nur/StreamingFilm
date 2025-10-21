import { Router } from "express";
import {
  refresh,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signup);
authRouter.post("/sign-in", signin);
authRouter.post("/sign-out", signout);
authRouter.post("/refresh", refresh);

export default authRouter;
