import express from "express";
const router = express.Router()
import { registerUser , 
    LoginUser
} from "../controllers/user.controller.js";

router.post('/register' , registerUser)
router.post('/login' , LoginUser)

export default router