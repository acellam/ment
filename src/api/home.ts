import { Application, Request, Response } from "express";

export class Home {
    public routes = (app: Application) => {
        app.route(process.env.API_BASE as string)
            // GET endpoint
            .get((_req: Request, res: Response) => {
                // Get all contacts
                res.status(200).send({
                    message: `Welcome to ment API.`,
                    version: "1.0.0"
                });
            })
            // POST endpoint
            .post((_req: Request, res: Response) => {
                // Create new contact
                res.status(200).send({
                    message: "POST request successfulll!!!!"
                });
            });
    }
}

export default new Home();
