// import { Request, Response } from "express";
// import Complaint from "../../model/student.complaint";
// import { Student } from "../../model/student.user";
// export const deleteComplaint = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const checkUser = await Student.findById(userId);
//     if (checkUser) {
//       if (checkUser.isDeleted == true || checkUser.isBlocked == true) {
//         return res.status(400).json({
//           status: "fail",
//           message:
//             "You can not update delete complaint, Your account is deleted or block!",
//         });
//       }
//     }

//     const compId = req.params.id;
//     await Complaint.findByIdAndUpdate(compId, {
//       isDeleted: true,
//     });
//     res.status(200).json({
//       status: "success",
//       message: "Complaint Deleted Successfully..",
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err || "An error occurred during registration.",
//     });
//   }
// };
import { Request, Response } from "express";
import Complaint from "../../model/student.complaint";
import { Student } from "../../model/student.user";

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
