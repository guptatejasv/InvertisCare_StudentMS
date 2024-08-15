import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import { Student } from "../../model/student.user";
import { transporter } from "../../helper/nodemailer";

export const deleteComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // Check if the user exists and is not deleted or blocked
    const checkUser = await Student.findById(userId);
    if (!checkUser || checkUser.isDeleted || checkUser.isBlocked) {
      return res.status(400).json({
        status: "fail",
        message:
          "You cannot delete the complaint. Your account is deleted or blocked!",
      });
    }

    const compId = req.params.id;

    // Find the complaint by ID and ensure it belongs to the user
    const complaint = await Complaint.findById(compId);

    if (!complaint) {
      return res.status(404).json({
        status: "fail",
        message: "Complaint not found.",
      });
    }

    if (complaint.studentRefId.toString() !== userId) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to delete this complaint.",
      });
    }

    // Mark the complaint as deleted
    complaint.isDeleted = true;
    await complaint.save();
    const user = await Student.findById(userId);
    if (user) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "InvertisCare: Complaint Deleted Confirmation",
        text: `Your Complaint with this ${complaint._id} Complaint Id at InvertisCare is Deleted Successfully.`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Complaint Deleted Successfully.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during deletion.",
    });
  }
};
