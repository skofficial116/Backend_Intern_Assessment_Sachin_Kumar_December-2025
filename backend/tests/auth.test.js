import { jest } from "@jest/globals";
import request from "supertest";
import bcrypt from "bcryptjs";
import app from "../app.js";
import User from "../models/User.model.js";
import { connect, closeDatabase, clearDatabase } from "./setup.js";

jest.setTimeout(30000);

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});


describe("Auth Controller", () => {
  describe("POST /api/auth/signup", () => {
    it("should create a new user successfully", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        fullName: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Signup successful");
      expect(res.body.data.email).toBe("test@example.com");
      expect(res.body.data.role).toBe("user");
    });

    it("should return error if email already exists", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);

      await User.create({
        fullName: "Existing User",
        email: "test@example.com",
        password: hashedPassword,
      });

      const res = await request(app).post("/api/auth/signup").send({
        fullName: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Email already registered");
    });

    it("should fail for invalid password length", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        fullName: "Weak Password",
        email: "weak@example.com",
        password: "123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Password must be at least 8 characters");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      await User.create({
        fullName: "Login User",
        email: "login@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Login successful");
      expect(res.body.data.email).toBe("login@example.com");
    });

    it("should fail login for incorrect password", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);

      await User.create({
        fullName: "Wrong Password User",
        email: "wrong@example.com",
        password: hashedPassword,
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Invalid credentials");
    });
  });
});
