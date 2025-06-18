import mongoose, { Schema } from "mongoose";

export interface User {
  id: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<User>("User", userSchema);
