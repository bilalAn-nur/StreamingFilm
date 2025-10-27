import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getUser);
// userRouter.post("/", createUser);
// userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);

export default userRouter;
