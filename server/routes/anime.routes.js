import { Router } from "express";
import {
  createAnime,
  getAnimes,
  mergedAnimeAPI,
} from "../controllers/anime.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";

const animeRouter = Router();

// authRouter.post("/sign-up", signup);
animeRouter.get("/", arcjetMiddleware, getAnimes);
animeRouter.post("/", arcjetMiddleware, authorize, createAnime);
animeRouter.get("/merged", authorize, mergedAnimeAPI);

export default animeRouter;
