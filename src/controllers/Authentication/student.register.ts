import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { studentId, email, password } = req.body;
    if (!studentId || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill all required fields..",
      });
    }
    if (studentId.length < 10 || studentId.length > 14) {
      return res.status(400).json({
        status: "fail",
        message: "Student ID must be between 10 and 14 characters long.",
      });
    }
    const existingStudentId = await Student.findOne({ studentId });
    if (existingStudentId) {
      return res.status(400).json({
        status: "fail",
        message: "StudentId already exists. Please Login..",
      });
    }
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists. Please use a different email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Student.create({
      studentId,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      message: "User created successfully..",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
