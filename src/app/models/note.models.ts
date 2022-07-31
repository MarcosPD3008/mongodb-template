import { Document, model, Schema } from "mongoose";

export interface Note extends Document{
    _id?:string;
    title:string;
    description:string;
    createdAt?:Date;
    updatedAt?:Date; 
}

export const NoteSchema = new Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    }
},{
    timestamps:true
})

export default model<Note>('notes', NoteSchema);
