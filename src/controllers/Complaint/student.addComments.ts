import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import Comment from "../../model/complaint.comment";
import { Student } from "../../model/student.user";
import HODNotification from "../../model/hod.notifications";
import DeanNotification from "../../model/dean.notifications";
import ChiefNotification from "../../model/chief.notifications";
export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const compId = req.params.id;
    const { comment } = req.body;

    const student = await Student.findById(userId);
    const complaint = await Complaint.findById(compId);
    if (!complaint) {
      return res.status(400).json({
        status: "fail",
        message: "No complaint found.",
      });
    }
    const comments = await Comment.create({
      studentRefId: student?._id,
      complaintId: compId,
      commentByStudent: comment,
    });
    await HODNotification.create({
      HODId: complaint.assignedTo,
      message: `A new Comment added with complaint Id: ${complaint._id} `,
      type: "Complaint Update",
    });
    if (complaint.escalatedToDean) {
      await DeanNotification.create({
        DeanId: complaint.escalatedToDean,
        message: `A new Comment added with complaint Id: ${complaint._id} `,
        type: "Complaint Update",
      });
    }
    if (complaint.escalatedToChief) {
      await ChiefNotification.create({
        ChiefId: complaint.escalatedToChief,
        message: `A new Comment added with complaint Id: ${complaint._id} `,
        type: "Complaint Update",
      });
    }

    res.status(200).json({
      status: "success",
      comments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
