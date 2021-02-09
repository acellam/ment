import app from "./app";

const port = process.env.PORT || 3000;

app.server.listen(port, () => {
    // tslint:disable-next-line
    console.info(`Express server listening on port ${port}.\nEnvironment: ${process.env.NODE_ENV}`);
});
