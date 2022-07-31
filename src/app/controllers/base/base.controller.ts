import { Request, Response } from "express";
import mongoose from "mongoose";
import { IBaseService } from "../../services/index.services";

export default abstract class BaseController<T>{
    service!:IBaseService<T>

    constructor(service:any){
        this.service = service;
    }

    Get = async (req: Request, res: Response) =>{
        let timeout = this.timeoutFn(res);

        try{
            let data = await this.service.find(req.query);
            clearTimeout(timeout);
            return res.status(200).json(data);
        }
        catch(error){
            clearTimeout(timeout);
            res.status(500).json(error)
        }
    }

    Find = async (req: Request, res: Response) =>{
        let timeout = this.timeoutFn(res);
        try{
            let id = req.params['id'];
            if([null, undefined, ''].includes(id)){
                res.status(400).json({
                    error: "property id is required"
                })
                return;
            }

            let data = await this.service.findOne(new mongoose.Types.ObjectId(id));
            clearTimeout(timeout);
            res.status(200).json(data);
        }
        catch(error){
            clearTimeout(timeout);
            res.status(500).json(error)
        }
    }

    Post = async (req: Request, res: Response) =>{
        let timeout = this.timeoutFn(res);
        try{
            let body = req.body;
            if(!body){
                res.status(400).json({
                    error: "property body is required"
                })
                return;
            }

            let data = (await this.service.create(body)) ? true : false;
            clearTimeout(timeout);
            res.status(201).json({ message: data ? "created": "not created", success: data });
        }
        catch(error){
            clearTimeout(timeout);
            res.status(500).json(error)
        }
    }

    Put = async (req: Request, res: Response) =>{
        let timeout = this.timeoutFn(res);
        try{
            let id = req.params['id'];
            if([null, undefined, ''].includes(id)){
                res.status(400).json({
                    error: "property id is required"
                })
                return;
            }

            let body = req.body;
            if(!body){
                res.status(400).json({
                    error: "property body is required"
                })
                return;
            }

            await this.service.update(new mongoose.Types.ObjectId(id), body);
            clearTimeout(timeout);
            res.status(200).json({message: "updated"});
        }
        catch(error){
            clearTimeout(timeout);
            res.status(500).json(error)
        }
    }

    Delete = async (req: Request, res: Response) =>{
        let timeout = this.timeoutFn(res);
        try{
            let id = req.params['id'];
            if([null, undefined, ''].includes(id)){
                res.status(400).json({
                    error: "property id is required"
                })
                return;
            }

            let data = (await this.service.delete(new mongoose.Types.ObjectId(id))) ? true : false;
            clearTimeout(timeout);
            res.status(200).json({ message: data ? "deleted": "not deleted", success: data });
        }
        catch(error){
            clearTimeout(timeout);
            res.status(500).json(error)
        }
    }

    private timeoutFn(res: Response){
        return setTimeout(() => {
            res.status(408).json({message: "Request timeout"});
            res.end();
        }, 
        (Number(process.env.server_timeout ?? 30000)))
    }
}