import * as bluebird from "bluebird";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

export class Database {
    public start(): void {
        (mongoose as any).Promise = bluebird;
        let dbName;

        dotenv.config();

        switch (process.env.NODE_ENV) {
            case "test":
                dbName = "ment_test";
                break;
            case "production":
                dbName = "ment";
                break;
            default:
                dbName = "ment_dev";
        }

        const dbAddress = process.env.DB_HOST || "127.0.0.1";
        const dbPort = process.env.DB_PORT || 27017;

        const options = {
            pass: "",
            user: "",
            useNewUrlParser: true
        };

        if (process.env.DB_AUTH === "true") {
            options.user = process.env.DB_USER as string;
            options.pass = process.env.DB_PASS as string;
        }

        mongoose.set("useCreateIndex", true);
        mongoose
            .connect(`mongodb://${dbAddress}:${dbPort}/${dbName}`, options)
            .catch(err => {
            if (err.message.indexOf("ECONNREFUSED") !== -1) {
                // tslint:disable-next-line
                console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
                process.exit(1);
            } else {
                throw err;
            }
        });
    }
}

export default new Database();
