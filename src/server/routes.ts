import { Application } from "express";
import contact from "./api/contact";
import home from "./api/home";

export class Routes {
    public routes(app: Application): void {
        home.routes(app);
        contact.routes(app);
    }
}
