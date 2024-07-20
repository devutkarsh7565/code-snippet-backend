import { Router } from "express";
import {
  createCodeSnippet,
  deleteCodeSnippetById,
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

codeSnippetRouter.delete("/:id", verifyJWT, deleteCodeSnippetById);

export default codeSnippetRouter;
