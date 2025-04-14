import express from "express";
import { register, login, getProfile, updateUser, deleteUser } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/validators.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/profile", auth, getProfile);
router.put("/", auth, updateUser); 
router.delete("/", auth, deleteUser);

export default router;
