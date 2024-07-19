import { Router } from "express";
import {
  createCodeSnippet,
  getAllCodeSnippetOfCurrentUser,
  getSingleCodeSnippetOfCurrentUser,
  updateCodeSnippetById,
} from "../controllers/codeSnippet.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const codeSnippetRouter = Router();

codeSnippetRouter.post("/create", verifyJWT, createCodeSnippet);

codeSnippetRouter.get("/", verifyJWT, getAllCodeSnippetOfCurrentUser);

codeSnippetRouter.get("/:id", verifyJWT, getSingleCodeSnippetOfCurrentUser);

codeSnippetRouter.put("/:id", verifyJWT, updateCodeSnippetById);

export default codeSnippetRouter;
