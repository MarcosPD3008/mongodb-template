import { Note } from "../../models/note.models";
import { NotesServices } from "../../services/index.services";
import {container, injectable} from "tsyringe";
import BaseController from "../base/base.controller";

@injectable()
export class NotesController extends BaseController<Note>{
    service!:NotesServices;

    constructor(){
        super(container.resolve(NotesServices));
    }
}

