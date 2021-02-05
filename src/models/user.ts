// tslint:disable
import * as bcrypt from "bcryptjs";
import { Document, model, Schema } from "mongoose";
import { NextFunction } from "express";

export interface IUserDocument extends Document {
    name: string;
    username: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

UserSchema.pre("save", (next: NextFunction) => {
    updatePassword(this, next);
});

UserSchema.pre("update", (next: NextFunction) => {
    updatePassword(this, next);
});

UserSchema.methods = {
    comparePassword: (candidatePassword, cb) => {
        const userObj: IUserDocument = this!;

        bcrypt.compare(candidatePassword, userObj.password, (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
}

function updatePassword(iUserDocument: IUserDocument | any, next: NextFunction) {
    const userObj: IUserDocument = iUserDocument!;

    bcrypt.hash(userObj.password, 10, (_err: any, hash) => {
        userObj.password = hash;
        next();
    });
}

export const User = model<IUserDocument>("User", UserSchema);
export const cleanCollection = () => User.remove({}).exec();

export default User;
