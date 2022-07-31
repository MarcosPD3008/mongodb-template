import { Router } from 'express';
import { NotesController } from '../controllers/notes/notes.controller';

const router = Router();   
const notes = new NotesController();

router.get('/', notes.Get);
router.get('/:id', notes.Find);
router.post('/', notes.Post);
router.put('/:id', notes.Put);
router.delete('/:id', notes.Delete);

export default router;
