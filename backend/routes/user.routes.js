import express from "express";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
  updateProfile,
  changePassword,
  requestAdminAccess,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

import {
  paginationValidator,
  userIdParamValidator,
  updateProfileValidator,
  changePasswordValidator,
  requestAdminValidator,
} from "../validators/user.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

/* ---------- Admin Routes ---------- */
router.get("/", protect, adminOnly, paginationValidator, validate, getAllUsers);

router.patch(
  "/:id/activate",
  protect,
  adminOnly,
  userIdParamValidator,
  validate,
  activateUser
);

router.patch(
  "/:id/deactivate",
  protect,
  adminOnly,
  userIdParamValidator,
  validate,
  deactivateUser
);

/* ---------- User Routes ---------- */

router.put(
  "/profile",
  protect,
  updateProfileValidator,
  validate,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePasswordValidator,
  validate,
  changePassword
);

router.post(
  "/request-admin",
  protect,
  requestAdminValidator,
  validate,
  requestAdminAccess
);

export default router;
