// src/services/task.service.ts
import { Task, TaskModel } from "../models/task.model";

export class TaskService {
  async getAll(): Promise<Task[]> {
    return TaskModel.find().exec();
  }

  async getById(id: string): Promise<Task | null> {
    return TaskModel.findById(id).exec();
  }

  async create(title: string, description?: string): Promise<Task> {
    const task = new TaskModel({ title, description });
    return task.save();
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    return TaskModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
