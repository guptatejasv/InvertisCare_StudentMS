import { Request, Response } from "express";
import { Student } from "../../model/student.user";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const checkUser = await Student.findById(userId);
    if (checkUser) {
      if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message:
            "You can not get your profile, Your account is deleted or block!",
        });
      }
    }
    const user = await Student.findById(userId).select("-password");
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
