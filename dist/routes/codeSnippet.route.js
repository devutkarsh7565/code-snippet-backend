"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeSnippet_controller_1 = require("../controllers/codeSnippet.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const codeSnippetRouter = (0, express_1.Router)();
codeSnippetRouter.post("/create", auth_middleware_1.verifyJWT, codeSnippet_controller_1.createCodeSnippet);
codeSnippetRouter.get("/", auth_middleware_1.verifyJWT, codeSnippet_controller_1.getAllCodeSnippetOfCurrentUser);
codeSnippetRouter.get("/:id", auth_middleware_1.verifyJWT, codeSnippet_controller_1.getSingleCodeSnippetOfCurrentUser);
codeSnippetRouter.put("/:id", auth_middleware_1.verifyJWT, codeSnippet_controller_1.updateCodeSnippetById);
codeSnippetRouter.delete("/:id", auth_middleware_1.verifyJWT, codeSnippet_controller_1.deleteCodeSnippetById);
exports.default = codeSnippetRouter;
