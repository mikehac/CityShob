// src/routes/task.routes.ts

import { Router } from "express";
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/task.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
