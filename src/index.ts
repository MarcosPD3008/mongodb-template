import "reflect-metadata";
import dotenv from 'dotenv';
import ServerApp from './server/serverApp';

dotenv.config()
const serverApp = new ServerApp();

serverApp.runServer();
serverApp.runDb();