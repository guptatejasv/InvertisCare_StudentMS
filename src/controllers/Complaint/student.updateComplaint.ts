import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import UpdatedComplaint from "../../model/student.updatedComplaintHistory";

export const updateComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const complaint = await Complaint.findById(compId);
    console.log(complaint);

    const storeUpdateComp = await UpdatedComplaint.create({
      studentId: complaint?.studentId,
      complaintId: complaint?._id,
      subject: complaint?.subject,
      description: complaint?.description,
      evidance: complaint?.evidance,
      isDeleted: complaint?.isDeleted,
      isBlocked: complaint?.isBlocked,
    });
    console.log(storeUpdateComp);
    await Complaint.findByIdAndUpdate(compId, req.body);
    const updateComplaint = await Complaint.findById(compId);

    res.status(200).json({
      status: "success",
      message: "Complaint updated successfully..",
      data: {
        updateComplaint,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
