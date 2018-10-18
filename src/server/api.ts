import { Application } from "express";

import home from "./api/home";
import contact from "./api/contact";
import webauth from "./api/webauth";

export class Api {
    public routes(app: Application): void {
        home.routes(app);
        contact.routes(app);
        webauth.routes(app);
    }
}
