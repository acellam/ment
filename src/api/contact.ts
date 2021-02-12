import { Application } from "express";
import { ContactController } from "../controllers/contact";

export class Contact {
    public contactController: ContactController = new ContactController();

    public routes = (app: Application) => {
        app.route(`${process.env.API_BASE}contacts`)
            // GET endpoint
            .get(this.contactController.getContacts)
            // POST endpoint
            .post(this.contactController.addNewContact);

        // Contact detail
        app.route(`${process.env.API_BASE}contacts/:contactId`)
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}

export default new Contact();
