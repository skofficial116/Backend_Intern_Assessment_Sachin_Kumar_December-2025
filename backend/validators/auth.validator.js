import { body } from "express-validator";

export const signupValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
