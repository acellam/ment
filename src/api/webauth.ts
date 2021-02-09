import { App } from "../app";
import { WebAuthController } from "../controllers/webauth";

export class WebAuth {
    public webAuthController!: WebAuthController;

    public routes(app: App): void {
        this.webAuthController = new WebAuthController(app);
        app.express.route(process.env.API_BASE + "login")
            // POST endpoint
            .post(this.webAuthController.login);
    }
}

export default new WebAuth();
