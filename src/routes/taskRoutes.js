import express from "express";
import {createTask, getTasks, updateTask, deleteTask} from "../controllers/taskController.js";
import authenticate from "../middleware/authMiddleware.js"
import asyncHandler from "../utils/asyncHandler.js"
import {validateCreateTask, validateGetTasks, validateUpdateTask, validateTaskId} from "../middleware/validateTask.js"
const router=express.Router();

router.post("/",authenticate,validateCreateTask,asyncHandler(createTask));
router.get("/",authenticate,validateGetTasks,asyncHandler(getTasks));
router.put("/:id",authenticate,validateTaskId,validateUpdateTask,asyncHandler(updateTask));
router.delete("/:id",authenticate,validateTaskId,asyncHandler(deleteTask));

export default router;