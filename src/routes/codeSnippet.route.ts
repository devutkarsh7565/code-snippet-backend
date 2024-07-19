import { Router } from "express";
import {
  createCodeSnippet,
  getAllCodeSnippetOfCurrentUser,
} from "../controllers/codeSnippet.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const codeSnippetRouter = Router();

codeSnippetRouter.post("/create", verifyJWT, createCodeSnippet);

codeSnippetRouter.get(
  "/current-user",
  verifyJWT,
  getAllCodeSnippetOfCurrentUser
);

export default codeSnippetRouter;
