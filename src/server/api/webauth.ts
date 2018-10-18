import { Application, Request, Response } from "express";
import { WebAuthController } from "../controllers/webauth";

export class WebAuth {
    public webAuthController: WebAuthController = new WebAuthController();

    public routes(app: Application): void {
        /**
         * @api {post} /api/v1/login Generate a token
         * @apiVersion 1.0.0
         * @apiName Login
         * @apiGroup Auth
         * @apiPermission public
         * @apiDescription In order to generate a token, you will need to already have a user in the database.
         *
         * @apiParam (Request body) {String} username The username
         * @apiParam (Request body) {String} password The password
         *
         * @apiExample {js} Example usage:
         * const data = {
         *   "username": "test@email.com",
         *   "password": "yourpassword"
         * };
         *
         * $http.post(url, data)
         *   .success((res) => doSomethingHere())
         *   .error((err) => doSomethingHere());
         *
         * @apiSuccess {String} token The token that must be used to access the other endpoints
         * @apiSuccess {String} expires The expiration datetime (YYYY-MM-DDTHH:mm:ssZ)
         * @apiSuccess {String} user The user id
         *
         * @apiSuccessExample {json} Success response:
         *     HTTPS 200 OK
         *     {
         *      "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... and the rest of the token here",
         *      "expires": "2017-10-28T14:50:17+00:00",
         *      "user": "57e12cab65c0c892381b8b44"
         *    }
         */
        app.route(process.env.API_BASE + "login")
            // GET endpoint
            .get((_req: Request, res: Response) => {
                // Get all contacts
                res.status(200).send({
                    message: `Use post to login`
                });
            })
            // POST endpoint
            .post(this.webAuthController.login);
    }
}

export default new WebAuth();
