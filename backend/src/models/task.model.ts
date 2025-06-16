// src/models/task.model.ts

import mongoose, { Schema } from "mongoose";

export interface Task {
  id: mongoose.Types.ObjectId | string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
}

const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const TaskModel = mongoose.model<Task>("Task", TaskSchema);
