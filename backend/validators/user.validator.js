import { body, param, query } from "express-validator";

export const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive number")
];

export const userIdParamValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID")
];

export const updateProfileValidator = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
];

export const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
];

export const requestAdminValidator = [
  body("codeword")
    .notEmpty()
    .withMessage("Codeword is required")
];
