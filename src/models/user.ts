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

UserSchema.pre("save", function(next) {
    updatePassword(this, next);
});

UserSchema.pre("update", function(next) {
    updatePassword(this, next);
});

UserSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
    const iUserDocument: IUserDocument | any = this!;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, iUserDocument.password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

function updatePassword(iUserDocument: IUserDocument | any, next: NextFunction | any) {
    if (iUserDocument.password) {
        bcrypt.hash(iUserDocument.password, 10, (_err: any, hash) => {
            iUserDocument.password = hash;
            next();
        });
    } else {
        next();
    }
}

export const User = model<IUserDocument>("User", UserSchema);
export const cleanCollection = () => User.deleteOne({}).exec();

export default User;
