import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { successResponse } from "../utils/response.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return successResponse(res, "Users fetched successfully", {
      page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.status = "active";
    await user.save();

    return successResponse(res, "User activated successfully");
  } catch (error) {
    next(error);
  }
};

export const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.status = "inactive";
    await user.save();

    return successResponse(res, "User deactivated successfully");
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  return successResponse(res, "Profile fetched successfully", req.user);
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;

    if (email) {
      const exists = await User.findOne({
        email,
        _id: { $ne: req.user._id },
      });

      if (exists) {
        res.status(409);
        throw new Error("Email already in use");
      }
    }

    req.user.fullName = fullName || req.user.fullName;
    req.user.email = email || req.user.email;

    await req.user.save();

    return successResponse(res, "Profile updated successfully", req.user);
  } catch (error) {
    next(error);
  }
};


export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error("Current and new password required");
    }

    if (newPassword.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters");
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Incorrect current password");
    }

    user.password = newPassword;
    await user.save();

    return successResponse(res, "Password updated successfully");
  } catch (error) {
    next(error);
  }
};
export const requestAdminAccess = async (req, res, next) => {
  try {
    const { codeword } = req.body;

    if (!codeword) {
      res.status(400);
      throw new Error("Admin codeword is required");
    }

    if (codeword !== process.env.ADMIN_CODEWORD) {
      res.status(401);
      throw new Error("Invalid admin codeword");
    }

    if (req.user.role === "admin") {
      res.status(400);
      throw new Error("User is already an admin");
    }

    req.user.role = "admin";
    req.user.status = "active";
    await req.user.save();

    return successResponse(res, "Admin access granted", {
      role: req.user.role,
    });
  } catch (error) {
    next(error);
  }
};
