import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = await authService.register(username, password);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const token = await authService.login(username, password);
  if (!token) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  res.status(200).json({ token });
};
