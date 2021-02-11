import { Request, Response } from "express";
import * as mongoose from "mongoose";

export class BaseController {

    public createRecord = (model: any, res: Response) => {
        model.save((err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            if (err) {
                res.send(err);
            }
            res.json(dbObject);
        });
    }

    public getRecords = (model: any, res: Response) => {
        model.find({}, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            if (err) {
                res.send(err);
            }
            res.json(dbObject);
        });
    }

    public getRecordWithID = (model: any, req: Request, res: Response) => {
        model.findById(req.params.contactId, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            if (err) {
                res.send(err);
            }
            res.json(dbObject);
        });
    }

    public updateRecord = (model: any, req: Request, res: Response) => {
        model.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            if (err) {
                res.send(err);
            }
            res.json(dbObject);
        });
    }

    public deleteRecord = (model: any, req: Request, res: Response) => {
        // tslint: disable-next-line
        model.remove({ _id: req.params.contactId }, (err: mongoose.CallbackError) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted Item!" });
        });
    }
}
