import { Router } from "express";
// import path from "node:path";
// import multer from "multer";
import {
  createUser,
  getCurrentUser,
  logoutUser,
  userLoggedIn,
} from "../controllers/user.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

// const upload = multer({
//   dest: path.resolve(__dirname, "../../public/data/uploads"),
//   limits: { fileSize: 3e7 }, // 30mb
// });

router.route("/register").post(createUser);
// upload.fields([{ name: "avatar", maxCount: 1 }]),

router.post("/login", userLoggedIn);

router.get("/current-user", verifyJWT, getCurrentUser);
router.put("/logout", verifyJWT, logoutUser);

export default router;
