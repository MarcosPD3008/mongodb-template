import { Router } from 'express';
import notes from './notes.routes'

const router: Router = Router();

router.use('/notes', notes);

export default router