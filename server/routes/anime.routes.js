import { Router } from "express";
import { createAnime, getAnimes } from "../controllers/anime.controller.js";

const animeRouter = Router();

// authRouter.post("/sign-up", signup);
animeRouter.get("/", getAnimes);
animeRouter.post("/", createAnime);

export default animeRouter;
