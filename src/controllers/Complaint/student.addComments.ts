import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import Comment from "../../model/complaint.comment";
import { Student } from "../../model/student.user";
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
      commentByHOD: comment,
    });
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
