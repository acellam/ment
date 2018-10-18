// tslint:disable
import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressValidator from "express-validator";
// import db from "../config/database";
import webauth from "./controllers/webauth";

import { Api } from "./api";

class App {

    public app: express.Application;
    public api: Api = new Api();

    constructor() {
        this.app = express();
        this.config();
        this.api.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(expressValidator());
        this.app.use(webauth.initialize());

        this.app.all(process.env.API_BASE + "*", (req, res, next) => {
            if (req.path.includes(process.env.API_BASE + "login")) return next();

            return webauth.authenticate((err: any, user: any, info: any) => {
                if (err) { return next(err); }
                if (!user) {
                    if (info.name === "TokenExpiredError") {
                        return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
                    } else {
                        return res.status(401).json({ message: info.message });
                    }
                }
                this.app.set("user", user);
                return next();
            })(req, res, next);
        });
    }

}

export default new App().app;
