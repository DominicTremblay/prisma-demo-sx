import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'getting the list of movies' });
});

export default router;
