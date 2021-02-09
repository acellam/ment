// tslint:disable
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as jwt from "jwt-simple";
import * as mongoose from "mongoose";
import * as passport from "passport";
import * as moment from "moment";
import { ExtractJwt, Strategy } from "passport-jwt";
import { App } from "../app";
import { IUserDocument, User } from "../models/user";

export class WebAuthController {

    public app: App;

    constructor(app: App) {
        this.app = app;
    }

    public initialize = () => {
        passport.use("jwt", this.getStrategy());

        return passport.initialize();
    };

    public authenticate = (callback: (err: any, user: any, info: any) => void) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public login = async (req: Request, res: Response) => {
        try {
            body('username', 'Username should not be empty').notEmpty();
            body('password', 'Password should not be empty').notEmpty();

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const user = await User.findOne({ username: req.body.username }).exec();

            if (user === null) return res.status(400).json({ message: "Invalid username, please sign up" });

            const success = await user.comparePassword(req.body.password);

            if (success === false) return res.status(400).json({ message: "Wrong login details" });

            res.status(200).json(this.genToken(user));
        } catch (err) {
            res.status(401).json({ message: "Invalid credentials", errors: err });
        }
    }

    private genToken = (user: IUserDocument): Object => {
        const expires = moment().utc().add({ days: 7 }).unix();
        const token = jwt.encode({
            exp: expires,
            username: user.username
        }, process.env.JWT_SECRET as string);

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user._id
        };
    };

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            passReqToCallback: true
        };

        return new Strategy(params, (_req: Request, payload: any, done: any) => {
            User.findOne({ username: payload.username }, (err: mongoose.CallbackError, user: IUserDocument) => {
                /* istanbul ignore next: passport response */
                if (err) {
                    return done(err);
                }
                /* istanbul ignore next: passport response */
                if (user === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { _id: user._id, username: user.username });
            });
        });
    }
}
