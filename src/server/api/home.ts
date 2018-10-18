import { Application, Request, Response } from "express";

export class Home {
    public routes(app: Application): void {
        app.route(process.env.API_BASE + "/")
        // GET endpoint
            .get((_req: Request, res: Response) => {
                // Get all contacts
                res.status(200).send({
                    message: `Welcome to Metvn API.`,
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
