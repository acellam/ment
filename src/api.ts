import { Application, Request, Response } from "express";
import cors = require("cors");

import home from "./api/home";
import contact from "./api/contact";
import webauth from "./api/webauth";
import user from "./api/user";
import apidoc from "./api/apidoc";
import { App } from "./app";
import { WebAuthController } from "./controllers/webauth";
import { NextFunction } from "express-serve-static-core";

export class Api {
    public webAuthController!: WebAuthController;

    public routes = (app: App) => {
        this.webAuthController = new WebAuthController(app);
        this.secureApi(app.express);
        // Add API routes
        home.routes(app.express);
        contact.routes(app.express);
        webauth.routes(app);
        user.routes(app.express);
        apidoc.routes(app.express);

        // If no route is matched by now, it must be a 404
        app.express.use((_req: Request, res: Response, next) => {
            const path = _req.path;
            res
                .status(404)
                .json({ error: "Endpoint not found", path });
            next();
        });

        app.express.use((error: object, _req: Request, res: Response, next: (error: object) => void) => {
            if (process.env.NODE_ENV === "production") {
                return res
                    .status(500)
                    .json({ error: "Unexpected error: " + error });
            }
            next(error);
        });
    }

    private secureApi(app: Application) {
        app.use(cors());
        app.use(this.webAuthController.initialize());
        app.all(`${process.env.API_BASE}*`, (req: any, res: any, next) => {
            // Allow login
            if (req.path.includes(`${process.env.API_BASE}login`)) {
                return next();
            }
            // Allow token request
            if (req.path.includes(`${process.env.API_BASE}token`)) {
                return next();
            }

            return this.authenticateApi(app, req, res, next);
        });
    }

    private authenticateApi(app: Application, req: Request | any, res: Response, next: NextFunction) {
        return this.webAuthController.authenticate((err: any, userDetail: any, info: any) => {
            if (err) {
                return next(err);
            }

            if (!userDetail) {
                if (info.name === "TokenExpiredError") {
                    return res
                        .status(401)
                        .json({ message: "Your token has expired. Please generate a new one" });
                } else {
                    return res
                        .status(401)
                        .json({ message: info.message });
                }
            }
            // set user on express
            app.set("user", userDetail);
            // set user on session
            if (req && req.session) {
                req.session.user = userDetail;
            }

            return next();
        })(req, res, next);
    }
}
