"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTags = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const http_errors_1 = __importDefault(require("http-errors"));
const tag_model_1 = require("../models/tag.model");
const createTags = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const _req = req;
    if (!name) {
        const error = (0, http_errors_1.default)(400, "All fields are required");
        return next(error);
    }
    const findTagByNameAndOwnerId = yield tag_model_1.Tag.findOne({
        name,
        owner: _req.userId,
    });
    if (findTagByNameAndOwnerId) {
        const error = (0, http_errors_1.default)(409, "Tag already exist with this name");
        return next(error);
    }
    const newTag = yield tag_model_1.Tag.create({ name, owner: _req.userId });
    return res.status(201).json({
        success: true,
        message: "Tag created successfully",
        newTag,
    });
}));
exports.createTags = createTags;
