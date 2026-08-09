import express from "express";
import {register, login} from "../controllers/authController.js";
import {validateRegister, validateLogin} from "../middleware/validateAuth.js";
import asyncHandler from "../utils/asyncHandler.js";
const router=express.Router();

router.post("/register",validateRegister,asyncHandler(register));
router.post("/login",validateLogin,asyncHandler(login));

export default router;