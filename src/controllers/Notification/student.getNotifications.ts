import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import Notification from "../../model/student.notificaitons";
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ studentId: userId });
    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error retrieving notifications.",
    });
  }
};
