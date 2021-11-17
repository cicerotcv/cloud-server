import bcrypt from "bcrypt";
import { Document } from "mongoose";
import mongoose from "../database";

interface IUserModel extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export const User = mongoose.model<Partial<IUserModel>>("User", UserSchema);
