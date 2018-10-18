import { Application } from "express";
import { ContactController } from "../controllers/contact";

export class Contact {
    public contactController: ContactController = new ContactController();

    public routes(app: Application): void {
        app.route(process.env.API_BASE + "/contact")
            // GET endpoint
            .get(this.contactController.getContacts)
            // POST endpoint
            .post(this.contactController.addNewContact);

        // Contact detail
        app.route(process.env.API_BASE + "/contact/:contactId")
        // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}

export default new Contact();
