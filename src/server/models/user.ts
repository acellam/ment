// tslint:disable
import * as bcrypt from "bcryptjs";
import { Document, model, Schema } from "mongoose";

export interface IUserDocument extends Document {
    name: string;
    username: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}


export const userSchema = new Schema({
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

userSchema.pre("save", function(next) {
    const iUserDocument: any = this;

    bcrypt.hash(iUserDocument.password, 10, (_err: any, hash) => {
        iUserDocument.password = hash;
        next();
    });
});

userSchema.pre("update", function(next) {
    const iUserDocument: any = this;

    bcrypt.hash(iUserDocument.password, 10, (_err: any, hash) => {
        iUserDocument.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean>{
    const password = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

export const User = model<IUserDocument>("User", userSchema);
export const cleanCollection = () => User.remove({}).exec();

export default User;
