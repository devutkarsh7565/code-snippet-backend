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
exports.getCurrentUser = exports.userLoggedIn = exports.createUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../models/user.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const generateAccessAndRefereshTokens = (userId, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            const error = (0, http_errors_1.default)(404, "User not found");
            return next(error);
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (err) {
        const error = (0, http_errors_1.default)(500, "Something went wrong while generating referesh and access token");
        return next(error);
    }
});
const createUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // console.log(req.file, req?.files, "file");
    if (!name || !email || !password) {
        const error = (0, http_errors_1.default)(400, "All fields are required");
        return next(error);
    }
    // database call
    try {
        const user = yield user_model_1.User.findOne({ email });
        if (user) {
            const error = (0, http_errors_1.default)(400, "user already exist with this email");
            return next(error);
        }
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, "Error while getting user"));
    }
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // const avatarLocalPath = files?.avatar?.[0]?.path;
    // console.log(avatarLocalPath);
    // if (!avatarLocalPath) {
    //   const error = createHttpError(400, "avatar is required");
    //   return next(error);
    // }
    // const avatar = await uploadOnCloudinary(avatarLocalPath);
    // // console.log(avatar?.url, "avatar");
    // if (!avatar) {
    //   const error = createHttpError(500, "Error while uploading avatar");
    //   return next(error);
    // }
    let newUser;
    // console.log("user crossed", avatar);
    try {
        newUser = yield user_model_1.User.create({
            name,
            email,
            password,
        });
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, "Error while creating user bsc of cloudinary"));
    }
    const createdUser = yield user_model_1.User.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        const error = (0, http_errors_1.default)(500, "Error while creating user");
        return next(error);
    }
    return res.status(201).json({
        success: true,
        message: "user created successfully",
        createdUser,
    });
}));
exports.createUser = createUser;
const userLoggedIn = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = (0, http_errors_1.default)(400, "All fields are required");
        return next(error);
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        const error = (0, http_errors_1.default)(401, "Invalid email or password");
        return next(error);
    }
    const isPasswordCorrect = yield (user === null || user === void 0 ? void 0 : user.isPasswordCorrect(password));
    if (!isPasswordCorrect) {
        const error = (0, http_errors_1.default)(401, "Invalid email or password");
        return next(error);
    }
    const tokens = yield generateAccessAndRefereshTokens(user._id, next);
    if (!tokens) {
        // An error has already been passed to `next` by `generateAccessAndRefereshTokens`
        return;
    }
    const { accessToken, refreshToken } = tokens;
    const loggedInUser = yield user_model_1.User.findById(user._id).select("-password -refreshToken");
    return res
        .status(200)
        .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
    })
        .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
    })
        .json({ accessToken, refreshToken, loggedInUser });
}));
exports.userLoggedIn = userLoggedIn;
const getCurrentUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _req = req;
    const currentUser = yield user_model_1.User.findById(_req.userId).select("-password -refreshToken");
    return res.status(200).json({ user: currentUser });
}));
exports.getCurrentUser = getCurrentUser;
