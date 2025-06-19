import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import { createServer } from "http";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { globalExceptionHandler } from "./customFilter/appExceptionsFilter";
import socketIoInit from "./socket.io";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use(globalExceptionHandler);

const httpServer = createServer(app);
socketIoInit(httpServer);

connectToDatabase().then(() => {
  console.log("Database connected successfully");
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
