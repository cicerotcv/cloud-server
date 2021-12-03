import { Document } from "mongoose";
import mongoose from "../database";

interface ITaskModel extends Document {
  _id: string;
  user: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITaskModel>(
  {
    user: {
      type: String,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Task = mongoose.model<Partial<ITaskModel>>("Task", TaskSchema);
