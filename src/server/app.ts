import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { Routes } from "./routes";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl = "mongodb://127.0.0.1:27017/metvn";

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);

        this.mongoSetup();
    }

    private mongoSetup(): void {
        // mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;
