import { Router } from "express";
import path from "node:path";
import multer from "multer";
import { createUser } from "../controllers/user.controller";

const router = Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30mb
});

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createUser);

export default router;
