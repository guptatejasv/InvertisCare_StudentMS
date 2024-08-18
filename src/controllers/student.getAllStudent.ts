import { Request, Response } from "express";
import { Student } from "../model/student.user";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const checkUser = await Student.find();

    res.status(200).json({
      status: "success",
      checkUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
