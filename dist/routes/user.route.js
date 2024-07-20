"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_path_1 = __importDefault(require("node:path"));
const multer_1 = __importDefault(require("multer"));
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    dest: node_path_1.default.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }, // 30mb
});
router
    .route("/register")
    .post(upload.fields([{ name: "avatar", maxCount: 1 }]), user_controller_1.createUser);
router.post("/login", user_controller_1.userLoggedIn);
exports.default = router;
