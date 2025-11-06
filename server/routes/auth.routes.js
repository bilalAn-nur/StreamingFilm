import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", arcjetMiddleware, signup);
authRouter.post("/sign-in", arcjetMiddleware, signin);
authRouter.post("/sign-out", arcjetMiddleware, signout);

export default authRouter;
