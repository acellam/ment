import { Application } from "express";
import { UserController } from "../controllers/user";

export class User {
    public userController: UserController = new UserController();

    public routes = (app: Application) => {
        app.route(`${process.env.API_BASE}user`)
            .get(this.userController.getUsers)
            .post(this.userController.addNewUser);

        // User detail
        app.route(`${process.env.API_BASE}user/:userId`)
            .get(this.userController.getUserWithID)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
    }
}

export default new User();
