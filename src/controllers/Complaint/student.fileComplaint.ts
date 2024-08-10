import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import nodemailer from "nodemailer";
import { Student } from "../../model/student.user";
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const fileComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { subject, description, photo, video } = req.body;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update File Complaint, Your account is deleted or block!",
        });
      }
    }
    if (!subject || !description) {
      return res.status(400).json({
        status: "fail",
        success: "Subject and description is required to fill..",
      });
    }
    const complaint = await Complaint.create({
      studentRefId: userId,
      subject,
      description,
      evidance: {
        photo,
        video,
      },
    });
    const user = await Student.findById(userId);
    if (user) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "InvertisCare: Complaint Submission Confirmation",
        text: `Your Complaint at InvertisCare is sumitted Successfully.\n Here is the ${complaint._id} Complaint Id. \nPlease keep it save for future reference.`,
      });
    }

    res.status(201).json({
      status: "success",
      message: "complaint filed successfully",
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
