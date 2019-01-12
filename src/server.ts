import * as dotenv from "dotenv";

import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    // tslint:disable-next-line
    console.log(`Express server listening on port ${port}.\nEnvironment: ${process.env.NODE_ENV}`);
});
