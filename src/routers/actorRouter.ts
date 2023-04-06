import { Router } from 'express';
import { deleteActor, getActorById, getAllActors } from '../handlers/actors';

const router = Router();

router.get('/', getAllActors);
router.get('/:id', getActorById);
router.put('/:id', getActorById);
router.delete('/:id', deleteActor);

export default router;
