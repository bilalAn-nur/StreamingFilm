import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";

const userRouter = Router();

userRouter.get("/", arcjetMiddleware, authorize, getUser);
// userRouter.post("/", createUser);
// userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);

export default userRouter;
