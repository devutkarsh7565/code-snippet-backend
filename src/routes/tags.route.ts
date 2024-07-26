import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import {
  createTags,
  getAllTagsOfCurrentUser,
} from "../controllers/tags.controller";

const tagsRouter = Router();

tagsRouter.post("/create", verifyJWT, createTags);
tagsRouter.get("/", verifyJWT, getAllTagsOfCurrentUser);

export default tagsRouter;
