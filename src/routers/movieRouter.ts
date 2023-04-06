import { Router } from 'express';
import { deleteMovie, getAllMovies, getMovieById, updateMovie } from '../handlers/movies';

const router = Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

export default router;
