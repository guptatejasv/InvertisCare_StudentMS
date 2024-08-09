import { Schema, Document, model, ObjectId } from "mongoose";

export interface IAuth extends Document {
  studentId: string;
  email: string;
  password: string;
  phone: string;
  course: string;
  year: string;
  name: string;
  dob: Date;
  photo: string;
  isDeleted: boolean;
  isBlocked: boolean;
}

const AuthSchema: Schema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      // required: true,
      unique: true,
    },
    course: {
      type: String,
      // required: true,
    },
    year: {
      type: String,
      // required: true,
    },
    dob: {
      type: Date,
    },
    photo: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    isDeleted: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Student = model<IAuth>("Student", AuthSchema);
