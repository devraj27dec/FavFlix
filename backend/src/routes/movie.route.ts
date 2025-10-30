import express from 'express'
const router = express.Router()
import { isauthenticated } from '../lib/middleware.js'
import { MovieController } from '../controllers/movie.controller.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


router.post('/add' , isauthenticated ,  upload.single("image"), MovieController.AddMovie)
router.get('/all' , isauthenticated , MovieController.getAllMovies)
router.post('/update/:id' , isauthenticated , upload.single("image"), MovieController.UpdateMovie)
router.delete('/delete/:id', isauthenticated , MovieController.deleteMovie)


export default router
