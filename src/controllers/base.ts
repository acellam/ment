import { Request, Response } from "express";
import * as mongoose from "mongoose";

export class BaseController {

    public createRecord = (model: any, res: Response) => {
        model.save((err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    public getRecords = (model: any, res: Response) => {
        model.find({}, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    public getRecordWithID = (model: any, req: Request, res: Response) => {
        model.findById(req.params.contactId, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    public updateRecord = (model: any, req: Request, res: Response) => {
        model.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    public deleteRecord = (model: any, req: Request, res: Response) => {
        model.remove({ _id: req.params.contactId }, (err: mongoose.CallbackError) => {
            this.sendResponse(err, res, { message: "Successfully deleted Item!" });
        });
    }

    private sendResponse(err: mongoose.CallbackError, res: Response<any, Record<string, any>>, dbObject: {}) {
        if (err) {
            res.send(err);
        }
        res.json(dbObject);
    }
}
