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

  // Set cookie for both development and production
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: false, // true in production, false in dev
    secure: isProduction, // true in production, false in dev
    sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in prod, 'lax' for dev
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    // path: '/', // default
    // domain: undefined // default
  });
  res.json({ message: "Login successful" });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
