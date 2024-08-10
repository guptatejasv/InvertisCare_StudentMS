import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { studentId, email, password } = req.body;

    // Validate input
    if (!studentId || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill all required fields.",
      });
    }

    // Validate studentId length
    if (studentId.length < 10 || studentId.length > 14) {
      return res.status(400).json({
        status: "fail",
        message: "Student ID must be between 10 and 14 characters long.",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Student.create({
      studentId,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      data: {
        user,
      },
    });
  } catch (err) {
    // General error response
    res.status(500).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
