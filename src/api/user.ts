import { Application } from "express";
import { UserController } from "../controllers/user";

export class User {
    public userController: UserController = new UserController();
    public routes = (app: Application) => {
        // All Users
        app.route(`${process.env.API_BASE}users`)
            // GET endpoint
            .get(this.userController.getUsers)
            // POST endpoint
            .post(this.userController.addNewUser);

        // User detail
        app.route(`${process.env.API_BASE}users/:userId`)
            // get specific user
            .get(this.userController.getUserWithID)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
    }
}

export default new User();
