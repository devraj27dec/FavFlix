import express from "express";
import { AuthController } from "../controllers/user.controller.js";
const router = express.Router()


router.post('/register' , AuthController.registerUser)
router.post('/login' , AuthController.LoginUser)

export default router