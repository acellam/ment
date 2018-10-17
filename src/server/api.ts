import { Application } from "express";

import home from "./api/home";
import contact from "./api/contact";

export class Api {
    public routes(app: Application): void {
        home.routes(app);
        contact.routes(app);
    }
}
