import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

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

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.json({ message: "Login successful" });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
