import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import { Student } from "../../model/student.user";
export const getAllComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update get Complaints, Your account is deleted or block!",
        });
      }
    }
    const complaints = await Complaint.find({
      studentRefId: userId,
      isDeleted: false,
    });
    res.status(200).json({
      status: "success",
      results: complaints.length,
      complaints,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
