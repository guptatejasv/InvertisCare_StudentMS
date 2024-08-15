import { Request, Response } from "express";
import Comment from "../../model/complaint.comment";

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const comments = await Comment.findById(commentId);
    if (comments) {
      if (comments.HODId || comments.DeanId || comments.ChiefId) {
        return res.status(203).json({
          status: "fail",
          message: "You are not authrized to delete this comment",
        });
      }
      comments.isDeleted = true;
      await comments.save();
    }

    res.status(200).jsonp({
      status: "success",
      message: "Comment is deleted Successfully..",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
