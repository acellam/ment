import { Request, Response } from "express";
import * as mongoose from "mongoose";

export class BaseController {

    protected createRecord = (model: any, res: Response) => {
        model.save((err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    protected getRecords = (model: any, res: Response) => {
        model.find({}, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    protected getRecordWithID = (model: any, req: Request, res: Response) => {
        model.findById(req.params.contactId, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    protected updateRecord = (model: any, req: Request, res: Response) => {
        model.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err: mongoose.CallbackError, dbObject: mongoose.Document) => {
            this.sendResponse(err, res, dbObject);
        });
    }

    protected deleteRecord = (model: any, req: Request, res: Response) => {
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
