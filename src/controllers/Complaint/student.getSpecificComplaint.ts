import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import { Student } from "../../model/student.user";
export const getSpecificComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const complaint = await Complaint.findById(compId);
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not get comlaint Detail, Your account is deleted or block!",
        });
      }
    }
    if (complaint) {
      if (complaint.studentRefId.toString() !== userId) {
        return res.status(403).json({
          status: "fail",
          message: "You are not authorized to get details of this complaint.",
        });
      }
    }
    if (complaint?.isDeleted == true) {
      return res.status(400).json({
        status: "fail",
        message: "This complaint has been deleted..",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        complaint,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
