import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import { transporter } from "../../helper/nodemailer";
import { Student } from "../../model/student.user";
import HODNotification from "../../model/hod.notifications";
import { HOD } from "../../model/official.HOD";

export const fileComplaint = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { subject, description, assignedTo, photo, video, type } = req.body;
    const checkHod = await HOD.findById(assignedTo);
    if (!checkHod) {
      return res.status(400).json({
        status: "fail",
        message: "No HOD exist, Please choose another",
      });
    }
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update File Complaint, Your account is deleted or block!",
        });
      }
      if (
        (checkUser.course ||
          checkUser.year ||
          checkUser.phone ||
          checkUser.photo ||
          checkUser.dob ||
          checkUser.name) == null
      ) {
        return res.status(400).json({
          status: "fail",
          message: "Please complete your profile first",
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
      type,
      assignedTo,
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
    await HODNotification.create({
      HODId: assignedTo,
      message: `A new Complaint with ${complaint._id} is assigned to you.`,
      type: "Complaint Update",
    });

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
