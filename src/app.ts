import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as http from "http";

import database from "./config/database";
import winston, { logger } from "./config/winston";
import { Api } from "./api";

export class App {
    public express!: express.Application;
    public api: Api = new Api();
    public session!: express.RequestHandler;
    public server!: http.Server;

    constructor() {
        try {
            // tslint:disable-next-line
            // if (process.env.NODE_ENV === 'development') console.log = () => null; // allow console
            this.express = express();
            this.config();
            database.start();
            this.api.routes(this);
        } catch (error) {
            logger.log("error", `App: Some weirdo error happened :( ", ${error}`);
        }
    }

    private config(): void {
        // make sure that the environment is set
        dotenv.config();
        // support application/json type post data
        this.express.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // so we can get the client's IP address
        this.express.enable("trust proxy");
        // set up logging
        this.express.use(morgan("combined", { stream: winston.stream } as any));
        this.server = http.createServer(this.express);
    }
}

export default new App();
