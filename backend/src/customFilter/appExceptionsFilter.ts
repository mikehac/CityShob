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
  const status = err instanceof AppException ? err.status : 500;
  const message = err.message || "Internal Server Error";
  const details = err instanceof AppException ? err.details : undefined;

  console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

  res.status(status).json({
    statusCode: status,
    message,
    details,
    timestamp: new Date().toISOString(),
  });
}
