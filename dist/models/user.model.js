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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    codeSnippet: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "CodeSnippet",
        },
    ],
    favourites: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "CodeSnippet",
        },
    ],
    trash: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "CodeSnippet",
        },
    ],
    tags: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
}, {
    timestamps: true,
});
// mongoose middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 10);
        next();
    });
});
//mongoose custom methods
userSchema.methods.isPasswordCorrect = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
userSchema.methods.generateAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
    }, config_1.config.accessTokenSecret, {
        expiresIn: config_1.config.accessTokenExpiry,
    });
};
userSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
    }, config_1.config.refreshTokenSecret, {
        expiresIn: config_1.config.refreshTokenExpiry,
    });
};
exports.User = mongoose_1.default.model("User", userSchema);
