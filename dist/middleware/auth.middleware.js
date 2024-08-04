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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const http_errors_1 = __importDefault(require("http-errors"));
const config_1 = require("../utils/config");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.verifyJWT = (0, asyncHandler_1.asyncHandler)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log(req.cookies, "cookies .....");
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            (yield ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", "")));
        console.log(token, "token is token");
        if (!token) {
            const error = (0, http_errors_1.default)(401, "Unauthorized request");
            return next(error);
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.config.accessTokenSecret);
        const user = yield user_model_1.User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password -refreshToken");
        if (!user) {
            const error = (0, http_errors_1.default)(401, "Invalid Access Token");
            return next(error);
        }
        const _req = req;
        _req.userId = user === null || user === void 0 ? void 0 : user._id;
        next();
    }
    catch (error) {
        const err = (0, http_errors_1.default)(401, "Invalid access token error ");
        return next(err);
    }
}));
