import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";
import { successResponse } from "../utils/response.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("Email already registered");
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    generateToken(res, user._id);

    return successResponse(
      res,
      "Signup successful",
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    generateToken(res, user._id);

    return successResponse(res, "Login successful", {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return successResponse(res, "Logged out successfully");
};

export const getCurrentUser = async (req, res) => {
  return successResponse(res, "User fetched successfully", {
    id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    role: req.user.role,
    status: req.user.status,
  });
};
