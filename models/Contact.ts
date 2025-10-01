// contact model
import mongoose, { Schema, Document } from "mongoose";
import dayjs from "dayjs";
export interface IContact extends Document {
  subject: string;
  email: string;  
  message: string;
  createdAt: string;
  updatedAt: string;
  status : "new" | "in-progress" | "closed";
  Replyed: string;
}

const ContactSchema: Schema = new Schema(
  {
    subject: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "in-progress", "closed"], default: "new" },
    Replyed: { type: String ,enum: ["yes", "no"], default: "no" },
    createdAt: { type: Date, default: () => dayjs().toDate() },
    updatedAt: { type: Date, default: () => dayjs().toDate() },
  },
  { timestamps: true }
);
export default mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
