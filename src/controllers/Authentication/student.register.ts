import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import bcrypt from "bcryptjs";

import { transporter } from "../../helper/nodemailer";

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
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "InvertisCare: Registration Successful!",
      // text: "You have successfully registered at InvertisCare. Please Login to the InvertisCare to complete the profile.",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Welcome to InvertisCare!</h2>
        <p>Dear ${user.name},</p>
        <p>We're excited to have you on board. You have successfully registered at InvertisCare. Please log in to complete your profile and start exploring our services.</p>
        <a 
          href="https://invertiscare.example.com/login" 
          style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Login to InvertisCare
        </a>
        <p style="margin-top: 20px;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Best regards,<br/>The InvertisCare Team</p>
        <footer style="margin-top: 20px; font-size: 12px; color: #777;">
          <p>You received this email because you registered at InvertisCare.</p>
          <p>If this wasn't you, please ignore this email.</p>
        </footer>
      </div>
    `,
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
      message: err || "Error: An error occurred during registration.",
    });
  }
};
