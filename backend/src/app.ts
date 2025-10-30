import dotenv from 'dotenv'
dotenv.config()
import express  from "express";
const app = express()
const port = process.env.PORT || 3000;
import UserRouter from './routes/user.route.js'
import MovieRouter from './routes/movie.route.js'
import { handleError } from "./lib/middleware.js";
import cors from 'cors'



app.use(cors({
  origin: ["http://localhost:5173", "https://fav-filx.vercel.app"],
  credentials: true,
}));


app.set("trust proxy", 1);

app.use("/uploads", express.static("uploads"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth' , UserRouter)
app.use('/api/v1/movie' , MovieRouter)



app.get('/' , (req , res) => {
    res.send("Hello World")
})

app.use(handleError)

app.listen(port , () => {
    console.log(`server running at port:${port}`)
});