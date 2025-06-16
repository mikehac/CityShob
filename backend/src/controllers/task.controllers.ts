import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export const getAllTasks = async (_: Request, res: Response): Promise<void> => {
  const tasks = await taskService.getAll();
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.getById(req.params.id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(task);
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dueDate } = req.body;
  const createdTask = await taskService.create(title, description, dueDate);
  res.status(201).json(createdTask);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const updatedTask = await taskService.update(req.params.id, req.body);
  if (!updatedTask) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const success = await taskService.delete(req.params.id);
  if (!success) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.status(204).send();
};
