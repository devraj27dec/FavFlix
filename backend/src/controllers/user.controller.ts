
import { registerSchema , loginSchema } from "../lib/types.js";
import bcrypt from "bcryptjs";
import { ErrorHandler } from "../lib/ErrorHandler.js";
import { JSONResponse } from "../lib/jsonresponse.js.js";
import type {NextFunction, Request , Response } from "express";
import jwt from "jsonwebtoken";
import {prisma} from '../lib/prismaClient.js'


export class AuthController {
    static registerUser = async (req:Request , res:Response , next:NextFunction) => {
       try {
           const parsed = registerSchema.safeParse(req.body);
    
        //    console.log("parsed data" , parsed)
           if(!parsed.success){
              throw new ErrorHandler(400 , "Check your missing fields")
           }
    
           const {username , email , password} = parsed.data
    
    
           const existinguser = await prisma.user.findFirst({where:{email}})
           
        //    console.log("Email" , existinguser)
    
           if (existinguser){
               throw new ErrorHandler(402 , "User Already Registered")
           }
    
           const genSalt = await bcrypt.genSalt(10)
           const hashedPassword = await bcrypt.hash(password , genSalt)
    
           const user = await prisma.user.create({
               data:{
                  email,
                  password:hashedPassword,
                  username 
               }
           })
           return JSONResponse.success(res , user , "User Register successfully"  , 200);
    
       } catch (error) {
           next(error)
       }
    }

    static LoginUser = async(req:Request , res:Response , next:NextFunction) => {
        try {
            const parsedData = loginSchema.safeParse(req.body)
            console.log('parsedData' , parsedData)
            const data = parsedData.data
            console.log("data" , data)
    
            if(!data?.email || !data.password){
                throw new ErrorHandler(401 , "Invalid Email or password")
            }
    
            const user = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            })
    
            if(!user){
               throw new ErrorHandler(404 , "User Not Found")
            }
    
            const isMatch = await bcrypt.compare(data.password , user.password)
    
            if(!isMatch){
                throw new ErrorHandler(400 , "Incorrect Password")
            }
    
            const token = jwt.sign({id: user.id } , process.env.JWT_SECRET_KEY! , {expiresIn : "1h"})
            return res.status(201).json({"message":"User Loggedin successfully" , "access_token": token})
        } catch (error) {
            next(error)
        }
    }

}





