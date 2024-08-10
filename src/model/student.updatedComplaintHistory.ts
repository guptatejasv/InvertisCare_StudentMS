import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Interface to represent a complaint document
export interface IComplaint extends Document {
  studentRefId: ObjectId; // ID of the student filing the complaint
  complaintId: ObjectId;
  subject: string; // Brief subject or title of the complaint
  description: string; // Detailed description of the complaint
  evidance?: {
    photo: string[];
    video: string[];
  };
  type: string;
  status: string; // Status of the complaint (e.g., "Pending", "Resolved")
  createdAt: Date; // Timestamp when the complaint was filed
  updatedAt: Date; // Timestamp when the complaint was last updated
  resolvedBy?: ObjectId; // ObjectId of who resolved the complaint
  resolvedAt?: Date; // Timestamp when the complaint was resolved (optional)
  resolution?: string; // Description of how the complaint was resolved (optional)
  isDeleted?: boolean;
  isBlocked?: boolean;
  isBlockedBy?: ObjectId;
}

// Define the Complaint schema
const ComplaintSchema: Schema = new Schema(
  {
    studentRefId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    complaintId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Complaint",
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    evidance: {
      photo: {
        type: [String],
      },
      video: {
        type: [String],
      },
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending",
      required: true,
    },
    resolution: {
      type: String,
      trim: true,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
    },
    resolvedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isBlockedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Export the model and attach the schema to it
const UpdatedComplaint = mongoose.model<IComplaint>(
  "UpdatedComplaint",
  ComplaintSchema
);
export default UpdatedComplaint;
