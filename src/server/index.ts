import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";

import * as homeController from "./controllers/home";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", homeController.index);

app.listen(app.get("port"), () => {
    // tslint:disable-next-line
    console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    // tslint:disable-next-line
    console.log("Press CTRL-C to stop\n");
});

module.exports = app;
