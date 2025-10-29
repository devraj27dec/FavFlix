import type { Request , Response } from "express"
import { MovieSchema } from "../lib/types.js"
import { ErrorHandler } from "../lib/ErrorHandler.js"
import { PrismaClient } from "../generated/prisma/client.js"
import { JSONResponse } from "../lib/jsonresponse.js.js"


const prisma = new PrismaClient()

export class MovieController {
    static AddMovie = async (req:Request , res: Response) => {

        try {
            const userId = (req as any).userId;

            if (!userId) throw new ErrorHandler(401, "Unauthorized");

            const parsedData = MovieSchema.safeParse(req.body)
            console.log("parsedData" , parsedData)
            if(!parsedData.success){
                throw new ErrorHandler(401 , "Check your Missing Fields")
            }
            
            const {title , director , location , budget , duration , year , type  } = req.body
    
            const movie = await prisma.movie.create({
                data: {
                    title,
                    director,
                    location,
                    budget,
                    duration,
                    year,
                    type,
                    userId: Number(userId)
                }
            })
            return JSONResponse.success(res , movie , "Movie Created successfully" , 201)
        } catch (error) {
            console.log("error" , error)
            throw new ErrorHandler(500 , "Internal Server Error")
        }
    }


    static UpdateMovie = async(req: Request , res: Response) => {
        try {
            const userId = (req as any).userId;

            if (!userId) throw new ErrorHandler(401, "Unauthorized");

            const movieId = req.params.id

            const parsedData = MovieSchema.safeParse(req.body)
            console.log("parsedData" , parsedData)

            if(!parsedData.success){
                throw new ErrorHandler(401 , "Check your Missing Fields")
            }
            
            const {title , director , location , budget , duration , year , type  } = req.body

            const updatedMovie = await prisma.movie.update({
                data: {
                    title,
                    director,
                    location,
                    budget,
                    duration,
                    year,
                    type,
                    userId: Number(userId)
                },
                where: {
                    mid: Number(movieId),
                    userId: Number(userId)
                }
            })
            return JSONResponse.success(res , updatedMovie , "Movie Updated successfully" , 201)
        } catch (error) {
            console.log(error)
            throw new ErrorHandler(500 , "Internal Server Error")   
        }
    }

    static getAllMovies = async(req:Request , res:Response) => {
        const userId = (req as any).userId;
        if (!userId) throw new ErrorHandler(401, "Unauthorized");

        const movies = await prisma.movie.findMany(
            {where: {
                userId: Number(userId)
            }}
        )
        return res.status(201).json(movies)
    }


    static deleteMovie = async(req:Request , res:Response) => {
        try {
            const userId = (req as any).userId;
            if (!userId) throw new ErrorHandler(401, "Unauthorized");

            const movieId = req.params.id

            await prisma.movie.delete({
                where:{
                    mid: Number(movieId),
                    userId: Number(userId)
                }
            })
            return JSONResponse.success(res , {} , "Movie Deleted successfully" , 201)
        } catch (error) {
            throw new ErrorHandler(500 , "Internal Server Error")   
        }
    }
}