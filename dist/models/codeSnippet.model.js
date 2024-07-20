"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeSnippet = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const codeSnippetSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    tags: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
}, {
    timestamps: true,
});
exports.CodeSnippet = mongoose_1.default.model("CodeSnippet", codeSnippetSchema);
