"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import path from "node:path";
// import multer from "multer";
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// const upload = multer({
//   dest: path.resolve(__dirname, "../../public/data/uploads"),
//   limits: { fileSize: 3e7 }, // 30mb
// });
router.route("/register").post(user_controller_1.createUser);
// upload.fields([{ name: "avatar", maxCount: 1 }]),
router.post("/login", user_controller_1.userLoggedIn);
exports.default = router;
