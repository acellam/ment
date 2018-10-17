import { Application, Request, Response } from "express";

export class Contact {
    public routes(app: Application): void {
        app.route("/contact")
            // GET endpoint
            .get((_req: Request, res: Response) => {
                // Get all contacts
                res.status(200).send({
                    message: "GET request successfulll!!!!"
                });
            })
            // POST endpoint
            .post((_req: Request, res: Response) => {
                // Create new contact
                res.status(200).send({
                    message: "POST request successfulll!!!!"
                });
            });

        // Contact detail
        app.route("/contact/:contactId")
        // get specific contact
            .get((_req: Request, res: Response) => {
                // Get a single contact detail
                res.status(200).send({
                    message: "GET request successfulll!!!!"
                });
            })
            .put((_req: Request, res: Response) => {
                // Update a contact
                res.status(200).send({
                    message: "PUT request successfulll!!!!"
                });
            })
            .delete((_req: Request, res: Response) => {
                // Delete a contact
                res.status(200).send({
                    message: "DELETE request successfulll!!!!"
                });
            });
    }
}

export default new Contact();
