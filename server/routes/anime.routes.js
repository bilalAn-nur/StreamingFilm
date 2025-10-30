import { Router } from "express";
import {
  createAnime,
  getAnimes,
  mergedAnimeAPI,
} from "../controllers/anime.controller.js";

const animeRouter = Router();

// authRouter.post("/sign-up", signup);
animeRouter.get("/", getAnimes);
animeRouter.post("/", createAnime);
animeRouter.get("/merged", mergedAnimeAPI);

export default animeRouter;
