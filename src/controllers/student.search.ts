import { Request, Response } from "express";
import Complaint, { IComplaint } from "../model/student.complaint";
import mongoose from "mongoose";
export const search = async (req: Request, res: Response) => {
  try {
    const { complaintId, status, subject, description } = req.query;
    const userId = req.user.id;
    const userIdObject = new mongoose.Types.ObjectId(userId);
    let query: Record<string, unknown> = { studentRefId: userIdObject };

    if (complaintId) query._id = complaintId;
    if (status) query.status = { $regex: status, $options: "i" }; // Case-insensitive search
    if (subject) query.subject = { $regex: subject, $options: "i" }; // Case-insensitive search
    if (description) query.description = { $regex: description, $options: "i" }; // Case-insensitive search

    const students: IComplaint[] = await Complaint.find(query);

    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
