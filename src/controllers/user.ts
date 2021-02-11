import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { UserSchema } from "../models/user";
import { BaseController } from "./base";

const User = mongoose.model("User", UserSchema);

export class UserController extends BaseController {

    public addNewUser = (req: Request, res: Response) => {
        this.createRecord(new User(req.body), res);
    }

    public getUsers = (_req: Request, res: Response) => {
        this.getRecords(User, res);
    }

    public getUserWithID = (req: Request, res: Response) => {
        this.getRecordWithID(User, req, res);
    }

    public updateUser = (req: Request, res: Response) => {
        this.updateRecord(User, req, res);
    }

    public deleteUser = (req: Request, res: Response) => {
        this.deleteRecord(User, req, res);
    }
}
