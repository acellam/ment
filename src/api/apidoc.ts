import { Application } from "express";
import * as swaggerUi from "swagger-ui-express";

export class ApiDoc {
    public swaggerDocument: object = require("./docs/swagger.json");

    public options: object = {
        swaggerOptions: {
            // authAction: {
            //     JWT: {
            //         name: "JWT",
            //         schema: {
            //             type: "apiKey",
            //             in: "header",
            //             name: "Authorization",
            //             description: ""
            //         },
            //         value: "Bearer <JWT>"
            //     }
            // },
            showExplorer: true
        }
    };

    public routes = (app: Application) => {
        app.use(`${process.env.API_DOC_BASE}docs/v1`, swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, this.options));
    }
}

export default new ApiDoc();
