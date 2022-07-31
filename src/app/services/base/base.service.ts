import {
    Model,
    Document,
    ObjectId
} from "mongoose";
import { injectable } from "tsyringe";
import database from "../../../database/database";

@injectable()
export class BaseService<T extends Document> implements IBaseService<T> {
    private model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this.model = schemaModel;
        this.setModel();
    }
    
    async create(item: T): Promise<T> {
        return await this.model.create(item);
    }

    async update(_id: ObjectId, item: any): Promise<void | null> {
        return await this.model.findByIdAndUpdate(_id, item);
    }

    async delete(_id: ObjectId): Promise<boolean | null> {
        return await this.model.findByIdAndDelete(_id)
    }

    async find(options?:any): Promise<T[]> {
        return await this.model.find(options);
    }

    async findOne(_id: ObjectId): Promise<any> {
        return await this.model.findById(_id);
    }

    setModel(){
        this.model = database.db.model<T>(this.model.modelName, this.model.schema);
    }
}

export interface IBaseService<T> {
    find(options?:any): Promise<T[]>;
    findOne(id: any): Promise<any>;
    create(item: T): Promise<T>;
    update(_id: any, item: any): Promise<void | null>;
    delete(_id: any,): Promise<boolean | null>;
    setModel(): any;
}