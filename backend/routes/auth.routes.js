// routes/auth.routes.js
import express from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

import {
  signupValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getCurrentUser);

export default router;
