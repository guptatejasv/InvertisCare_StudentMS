import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import { Student } from "../../model/student.user";
export const deleteComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update delete complaint, Your account is deleted or block!",
        });
      }
    }
    const compId = req.params.id;
    await Complaint.findByIdAndUpdate(compId, {
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
