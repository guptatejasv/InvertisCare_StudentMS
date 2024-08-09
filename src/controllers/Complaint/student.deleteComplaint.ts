import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";

export const deleteComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const complaint = await Complaint.findByIdAndUpdate(compId, {
      isDeleted: true,
    });
    res.status(200).json({
      status: "success",
      message: "Complaint Deleted Successfully..",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
