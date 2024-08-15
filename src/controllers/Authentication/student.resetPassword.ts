import { Request, Response } from "express";
import { Student } from "../../model/student.user";

import dotenv from "dotenv";
dotenv.config();

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await Student.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
