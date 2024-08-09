import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";

export const getAllComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const complaints = await Complaint.find({
      studentId: userId,
      isDeleted: false,
    });
    res.status(200).json({
      status: "success",
      results: complaints.length,
      data: {
        complaints,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
