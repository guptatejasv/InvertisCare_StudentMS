import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import Notification from "../../model/student.notificaitons";
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not update get notifications, Your account is deleted or block!",
        });
      }
    }
    const notifications = await Notification.find({ studentId: userId });
    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
