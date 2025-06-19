import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      (req as any).user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization token missing" });
  }
};
