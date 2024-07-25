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
exports.deleteCodeSnippetById = exports.updateCodeSnippetById = exports.getSingleCodeSnippetOfCurrentUser = exports.getAllCodeSnippetOfCurrentUser = exports.createCodeSnippet = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const http_errors_1 = __importDefault(require("http-errors"));
const codeSnippet_model_1 = require("../models/codeSnippet.model");
const createCodeSnippet = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, code, language, tags } = req.body;
    if (!title || !description || !code || !language || !tags) {
        const error = (0, http_errors_1.default)(400, "All fields are required");
        return next(error);
    }
    const _req = req;
    console.log(_req === null || _req === void 0 ? void 0 : _req.userId, "req console");
    const findCodeSnippetByUserAndTitle = yield codeSnippet_model_1.CodeSnippet.findOne({
        title,
        owner: _req.userId,
    });
    if (findCodeSnippetByUserAndTitle) {
        const error = (0, http_errors_1.default)(409, "code snippet already exist with this title");
        return next(error);
    }
    const newCodeSnippet = yield codeSnippet_model_1.CodeSnippet.create({
        title,
        description,
        code,
        language,
        owner: _req.userId,
    });
    if (!newCodeSnippet) {
        const error = (0, http_errors_1.default)(500, "Error while creating code snippet");
        return next(error);
    }
    return res.status(201).json({
        success: true,
        message: "code snippet created successfully",
        newCodeSnippet,
    });
}));
exports.createCodeSnippet = createCodeSnippet;
const getAllCodeSnippetOfCurrentUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const { title, description } = req.query;
    console.log(title);
    // Define the searchCriteria with the appropriate type
    const searchCriteria = {
        owner: _req.userId,
    };
    if (title) {
        searchCriteria.title = { $regex: title, $options: "i" }; // Case-insensitive regex search
    }
    if (description) {
        searchCriteria.description = {
            $regex: description,
            $options: "i",
        };
    }
    const codeSnippets = yield codeSnippet_model_1.CodeSnippet.find(searchCriteria);
    if (!codeSnippets || codeSnippets.length === 0) {
        const error = (0, http_errors_1.default)(404, "No code snippets found");
        return next(error);
    }
    return res.status(200).json({
        success: true,
        codeSnippets,
        message: "Code snippets for current user fetched successfully",
    });
}));
exports.getAllCodeSnippetOfCurrentUser = getAllCodeSnippetOfCurrentUser;
const getSingleCodeSnippetOfCurrentUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const { id } = req.params;
    const codeSnippet = yield codeSnippet_model_1.CodeSnippet.findOne({
        _id: id,
        owner: _req.userId,
    });
    if (!codeSnippet) {
        const error = (0, http_errors_1.default)(404, "No code snippet found");
        return next(error);
    }
    return res.status(200).json({
        success: true,
        codeSnippet,
        message: "code snippet for Current User fetched successfully",
    });
}));
exports.getSingleCodeSnippetOfCurrentUser = getSingleCodeSnippetOfCurrentUser;
const updateCodeSnippetById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const { id } = req.params;
    const { title, description, code, language } = req.body;
    if (!title || !description || !code || !language) {
        const error = (0, http_errors_1.default)(400, "All fields are required");
        return next(error);
    }
    const codeSnippet = yield codeSnippet_model_1.CodeSnippet.findOne({
        _id: id,
        owner: _req.userId,
    });
    if (!codeSnippet) {
        const error = (0, http_errors_1.default)(404, "No code snippet found");
        return next(error);
    }
    const updatedCodeSnippet = yield codeSnippet_model_1.CodeSnippet.findByIdAndUpdate({ _id: id }, { title, description, code, language }, { new: true });
    if (!updatedCodeSnippet) {
        const error = (0, http_errors_1.default)(500, "Error while updating code snippet");
        return next(error);
    }
    return res.status(200).json({
        success: true,
        message: "code snippet updated successfully",
        updatedCodeSnippet,
    });
}));
exports.updateCodeSnippetById = updateCodeSnippetById;
const deleteCodeSnippetById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const { id } = req.params;
    const codeSnippet = yield codeSnippet_model_1.CodeSnippet.findOne({
        _id: id,
        owner: _req.userId,
    });
    if (!codeSnippet) {
        const error = (0, http_errors_1.default)(404, "No code snippet found");
        return next(error);
    }
    yield codeSnippet_model_1.CodeSnippet.findByIdAndDelete({ _id: id });
    return res.status(200).json({
        success: true,
        message: "code snippet deleted successfully",
    });
}));
exports.deleteCodeSnippetById = deleteCodeSnippetById;
