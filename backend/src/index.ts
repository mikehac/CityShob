import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { createServer } from "http";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { globalExceptionHandler } from "./customFilter/appExceptionsFilter";
import socketIoInit from "./socket.io";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(globalExceptionHandler);

const httpServer = createServer(app);
socketIoInit(httpServer);

connectToDatabase().then(() => {
  console.log("Database connected successfully");
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
