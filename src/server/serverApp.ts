import express, { Application } from 'express'
import cors from 'cors';
import routes from "../app/routes/index.routes";
import database from '../database/database';


export default class ServerApp {
    private app: Application;
	private port: string;

    constructor() {
        this.app  = express();
        this.port = process.env.server_port || '3000';

        // middlewares
        this.middlewares();
        
        // routes   
        this.routes();
    }

    private routes() {
        this.app.use('/', routes);
    }

    private middlewares () {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json());  
        this.app.use(cors()) 
    }

    runServer() {
        this.app.listen(this.port, () => {  console.log(`Server running on port ${this.port}`) });
    } 

    runDb() {
        database.startConnection()
        .then(() => {
            console.log('Database connected');
        })
        .catch(err => {
            console.log(err);
        })
    }
}