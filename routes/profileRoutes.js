import express from "express";
import {
  createProfile,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
} from "../controllers/profile.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import FileController from "../controllers/file.controller.js";

const router = express.Router();

router.post("/", auth, createProfile);
router.get("/", auth, getMyProfile);
router.put("/", auth, updateMyProfile);
router.delete("/", auth, deleteMyProfile);

router.post("/avatar", auth, upload.single("avatar"), FileController.updateAvatar);
router.delete("/avatar", auth, FileController.deleteAvatar);

export default router;
