// tslint:disable
import { Request, Response } from "express";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUserDocument, User } from "../models/user";
import * as dotenv from "dotenv";

export class WebAuthController {

    public initialize = () => {
        dotenv.config();
        passport.use("jwt", this.getStrategy());

        return passport.initialize();
    };

    public authenticate = (callback: (err: any, user: any, info: any) => void) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public login = async (req: Request, res: Response) => {
        try {
            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid password").notEmpty();

            const errors = req.validationErrors();

            if (errors) throw errors;

            const user = await User.findOne({ username: req.body.username }).exec();

            if (user === null) throw new Error("User not found");

            const success = await user.comparePassword(req.body.password);

            if (success === false) throw new Error("");

            res.status(200).json(this.genToken(user));

        } catch (err) {
            res.status(401).json({ message: "Invalid credentials", errors: err });
        }
    };

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
            User.findOne({ username: payload.username }, (err, user) => {
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
