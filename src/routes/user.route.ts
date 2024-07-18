import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { createUser } from "../controllers/user.controller";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createUser);

export default router;
