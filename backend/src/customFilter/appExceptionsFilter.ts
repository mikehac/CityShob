import { Request, Response, NextFunction } from "express";

export class AppException extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status = 500, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function globalExceptionHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  let status = 500;
  let message = err.message || "Internal Server Error";
  let details = undefined;

  // Handle custom AppException
  if (err instanceof AppException) {
    status = err.status;
    details = err.details;
  }
  // Handle Mongoose validation errors
  else if ((err as any).name === "ValidationError") {
    status = 400;
    message = "Validation Error";
    details = (err as any).errors;
  }
  // Handle Mongoose duplicate key error
  else if ((err as any).code === 11000) {
    status = 409;
    message = "Duplicate key error";
    details = (err as any).keyValue;
  }

  // Log error stack in development
  if (process.env.NODE_ENV !== "production") {
    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);
    if (err.stack) {
      console.error(err.stack);
    }
  } else {
    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);
  }

  res.status(status).json({
    statusCode: status,
    message,
    details: process.env.NODE_ENV !== "production" ? details : undefined,
    timestamp: new Date().toISOString(),
  });
}
