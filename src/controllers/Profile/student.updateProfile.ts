import { Request, Response } from "express";
import { Student } from "../../model/student.user";
// import Notification from "../../model/student.notificaitons";
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const { name, phone, course, year, dob } = req.body;
    const correctName = name.toUpperCase();
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
    const user = await Student.findByIdAndUpdate(
      userId,
      {
        name: correctName,
        phone,
        course,
        year,
        dob,
        photo: req.file?.filename,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Student profile updated successfully..",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during updating profile.",
    });
  }
};
