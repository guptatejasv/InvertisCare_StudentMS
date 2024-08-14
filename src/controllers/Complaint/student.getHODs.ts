import { Request, Response } from "express";
import { HOD } from "../../model/official.HOD";
export const getHODs = async (req: Request, res: Response) => {
  try {
    const hods = await HOD.find().select(
      "-role -phone -HODId -email -createdAt -updatedAt -dob"
    );
    if (hods.length == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Not found!",
      });
    }
    res.status(200).jsonp({
      status: "success",
      results: hods.length,
      hods,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
