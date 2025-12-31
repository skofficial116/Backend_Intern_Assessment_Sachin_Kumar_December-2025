import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser"; // ✅ ADD THIS

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

import dotenv from "dotenv";
dotenv.config();

console.log("CLIENT_URL =", process.env.CLIENT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
