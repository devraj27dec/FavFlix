import type { Response } from "express"

export class JSONResponse{
    static success(res: Response , data = {} , message:string , statusCode: number){
        return res.status(201).json({
            success: true,
            statusCode,
            message,
            data
        })
    }
}