import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import Notification from "../../model/student.notificaitons";
export const readNotification = async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const notificationId = req.params.notificationId;

  try {
    const notificationId = req.body.id;
    const userId = req.user.id;
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, studentId: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        status: "fail",
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error marking notification as read.",
    });
  }
};
