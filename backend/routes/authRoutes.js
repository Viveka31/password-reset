import express from "express";
import {
  forgotPassword,
  verifyToken,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/forgot", forgotPassword);
router.get("/verify/:token", verifyToken);
router.post("/reset/:token", resetPassword);

export default router;