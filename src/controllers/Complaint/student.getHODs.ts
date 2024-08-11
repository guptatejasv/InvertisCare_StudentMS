import { Request, Response } from "express";
import { HOD } from "../../model/official.HOD";
export const getHODs = async (req: Request, res: Response) => {
  try {
    const hods = await HOD.find();
    res.status(200).jsonp({
      status: "success",
      hods,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during registration.",
    });
  }
};
