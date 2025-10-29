import express from 'express'
import { isauthenticated } from '../lib/middleware.js'
import { MovieController } from '../controllers/movie.controller.js'
const router = express.Router()

router.post('/add' , isauthenticated , MovieController.AddMovie)
router.get('/all' , isauthenticated , MovieController.getAllMovies)
router.post('/update/:id' , isauthenticated , MovieController.UpdateMovie)
router.delete('/delete/:id', isauthenticated , MovieController.deleteMovie)


export default router
