import { Request, Response } from "express";
import { Student } from "../../model/student.user";
import crypto from "crypto";
import { transporter } from "../../helper/nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const user = await Student.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No user found",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetPassword/${resetToken}`;
    const message = `Forgot your passsword? Please submit a PATCH request with a new Password to: ${resetURL}.\n If you don't forget the password please ignore this mail! `;
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "InvertisCare: Forget Password Mail",
        text: message,
      });
      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
