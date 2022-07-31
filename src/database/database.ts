import { Mongoose } from "mongoose";

class DatabaseConnection {
    private database:Mongoose = new Mongoose();

    constructor() {}

    get db(): Mongoose {
        return this.database;
    }

    async startConnection() {
        return this.database.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`);
    }

    async closeConnection() {
        return await this.database.connection.close();
    }

    setModel(modelName: string, schema: any) {
        return this.database.model(modelName, schema);
    }
}

export default new DatabaseConnection();