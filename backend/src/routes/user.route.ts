import express from "express";
import { AuthController } from "../controllers/user.controller.js";
import {perMinuteLimiter , perMinuteLimiterRelaxed} from '../lib/ratelimiter.js'


const router = express.Router()


router.post('/register' , perMinuteLimiter,  AuthController.registerUser)
router.post('/login' , perMinuteLimiterRelaxed, AuthController.LoginUser)


export default router