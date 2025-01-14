import { Request, Response } from "express";
import { Student } from "../../model/student.user";

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    await Student.findByIdAndUpdate(userId, {
      isDeleted: true,
    });

    res.status(200).json({
      status: "success",
      message: "Student Account is deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during account Deletion.",
    });
  }
};
