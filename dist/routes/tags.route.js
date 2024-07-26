"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tags_controller_1 = require("../controllers/tags.controller");
const tagsRouter = (0, express_1.Router)();
tagsRouter.post("/create", auth_middleware_1.verifyJWT, tags_controller_1.createTags);
tagsRouter.get("/", auth_middleware_1.verifyJWT, tags_controller_1.getAllTagsOfCurrentUser);
exports.default = tagsRouter;
