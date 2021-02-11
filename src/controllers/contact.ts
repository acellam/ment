import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { ContactSchema } from "../models/contact";
import { BaseController } from "./base";

const Contact = mongoose.model("Contact", ContactSchema);

export class ContactController extends BaseController {

    public addNewContact = (req: Request, res: Response) => {
        this.createRecord(new Contact(req.body), res);
    }

    public getContacts = (_req: Request, res: Response) => {
        this.getRecords(Contact, res);
    }

    public getContactWithID = (req: Request, res: Response) => {
        this.getRecordWithID(Contact, req, res);
    }

    public updateContact = (req: Request, res: Response) => {
        this.updateRecord(Contact, req, res);
    }

    public deleteContact = (req: Request, res: Response) => {
        this.deleteRecord(Contact, req, res);
    }
}
