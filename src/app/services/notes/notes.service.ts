import { BaseService } from "../base/base.service";
import NoteSchema, { Note } from "../../models/note.models";
import { injectable } from "tsyringe";

@injectable()
export class NotesServices extends BaseService<Note>{
    constructor(){
        super(NoteSchema);
    }
}