import mongoose from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  token: string;
  OTP: string;
  verified: boolean;
  CompanyNumber: string;
  StaffID: string;
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    OTP: {
      type: String,
    },
    StaffID: {
      type: String,
    },
    CompanyNumber: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
