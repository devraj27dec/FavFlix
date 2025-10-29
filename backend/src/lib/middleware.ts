import type {Request , Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./ErrorHandler.js";



export const isauthenticated = (req:Request , res:Response , next:NextFunction) => {
    const authHeader = req.headers.authorization;
    // console.log("headers" , authHeader)
    const token = authHeader?.split(" ")[1];
    console.log("token" , token)

    if(!token){
        throw new ErrorHandler(401 , "Access denied")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: number };
        console.log("✅ Decoded token:", decoded);
        (req as any).userId = decoded.id;
        next()
    } catch (error) {
        throw new ErrorHandler(401 , "Invalid Token")
    }
    
}


export const handleError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
