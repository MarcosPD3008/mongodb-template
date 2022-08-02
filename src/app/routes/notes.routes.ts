import { Router } from 'express';
import { NotesController } from '../controllers/notes/notes.controller';
import { container } from "tsyringe";

const router = Router();   
const notes = container.resolve(NotesController);

router.get('/', notes.Get);
router.get('/:id', notes.Find);
router.post('/', notes.Post);
router.put('/:id', notes.Put);
router.delete('/:id', notes.Delete);

export default router;
