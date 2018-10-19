// tslint:disable
import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressValidator from "express-validator";
import database from "./config/database";
import { WebAuthController } from "./controllers/webauth";

import { Api } from "./api";

class App {
    public app: express.Application;
    public api: Api = new Api();
    public webAuthController: WebAuthController = new WebAuthController();

    constructor() {
        this.app = express();

        this.config();

        this.api.routes(this.app);

        database.start();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(expressValidator());
        // so we can get the client's IP address
        this.app.enable("trust proxy");
        this.app.use(this.webAuthController.initialize());

        this.app.all(process.env.API_BASE + "*", (req, res, next) => {
            if (req.path.includes(process.env.API_BASE + "login")) {
                return next();
            }

            //If test environment or development, allow creating of user
            if (!this.isProductionEnvironment && req.path.includes(process.env.API_BASE + "user")) {
                return next();
            }

            return this.webAuthController.authenticate((err: any, user: any, info: any) => {
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

    private isProductionEnvironment = () =>{
        return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
    }

}

export default new App().app;
