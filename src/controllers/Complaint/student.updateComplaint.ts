import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import UpdatedComplaint from "../../model/student.updatedComplaintHistory";
import { Student } from "../../model/student.user";
export const updateComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update update Complaint, Your account is deleted or block!",
        });
      }
    }
    const complaint = await Complaint.findById(compId);
    if (complaint) {
      if (complaint.studentRefId.toString() !== userId) {
        return res.status(403).json({
          status: "fail",
          message: "You are not authorized to update this complaint.",
        });
      }
    }
    if (complaint?.status == "pending") {
      const storeUpdateComp = await UpdatedComplaint.create({
        studentRefId: complaint?.studentRefId,
        complaintId: complaint?._id,
        subject: complaint?.subject,
        type: complaint?.type,
        description: complaint?.description,
        evidance: complaint?.evidance,
        isDeleted: complaint?.isDeleted,
        isBlocked: complaint?.isBlocked,
      });

      console.log(storeUpdateComp);
      const updateComplaint = await Complaint.findByIdAndUpdate(
        compId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        status: "success",
        message: "Complaint updated successfully..",
        data: {
          updateComplaint,
        },
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: `Cann't update the complaint because complaint is in progress or resolved..`,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
