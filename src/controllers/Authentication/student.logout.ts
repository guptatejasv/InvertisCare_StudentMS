import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
// import Redis from "ioredis";

dotenv.config();
// const redis = new Redis();

export const logout = async (req: Request, res: Response) => {
  try {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    // if (token) {
    //   await redis.sadd("blacklistedTokens", token); // Add token to blacklist
    // }

    res.status(200).json({
      status: "success",
      message: "Logged out successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
