import * as dotenv from "dotenv";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // tslint:disable-next-line
    console.log("Express server listening on port " + PORT);
});
