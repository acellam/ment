import { Application, Request, Response } from "express";

import home from "./api/home";
import contact from "./api/contact";
import webauth from "./api/webauth";
import user from "./api/user";

export class Api {
    public routes(app: Application): void {
        // Add API routes
        home.routes(app);
        contact.routes(app);
        webauth.routes(app);
        user.routes(app);

        // If no route is matched by now, it must be a 404
        app.use((_req: Request, res: Response, next) => {
            const path = _req.path;
            res.status(404).json({ error: "Endpoint not found", path });
            next();
        });

        app.use((error: object, _req: Request, res: Response, next: (error: object) => void) => {
            if (process.env.NODE_ENV === "production") {
                return res.status(500).json({ error: "Unexpected error: " + error });
            }
            next(error);
        });
    }
}
