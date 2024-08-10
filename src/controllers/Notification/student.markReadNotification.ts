import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import Notification from "../../model/student.notificaitons";
export const readNotification = async (req: Request, res: Response) => {
  try {
    const notificationId = req.body.id;
    const userId = req.user.id;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update your profile, Your account is deleted or block!",
        });
      }
    }
    const notificationCheck = await Notification.findById(notificationId);
    if (notificationCheck?.studentRefId.toString() !== userId) {
      return res.status(400).json({
        status: "fail",
        message: "You are not authorized to mark this notification as read..",
      });
    }
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, studentRefId: userId },
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
      message: err,
    });
  }
};
