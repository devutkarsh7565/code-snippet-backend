import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { createTags } from "../controllers/tags.controller";

const tagsRouter = Router();

tagsRouter.post("/create", verifyJWT, createTags);

export default tagsRouter;
