import "mocha";
import * as supertest from "supertest";
import { IUserDocument, User } from "../models/user";
import app from "../app";

export const request = supertest(app.server);

const testUser = { username: "testuser", password: "mytestpass" };

const createUser = async (): Promise<void> => {
    const UserModel = new User(testUser);
    await UserModel.save();
};

const getUser = async (): Promise<IUserDocument> => {
    const users = await User.find({});

    if (users.length === 0) {
        await createUser();
        return getUser();
    } else {
        return users[0];
    }
};

export const login = async (): Promise<any> => {
    const user = await getUser();

    return request.post(`${process.env.API_BASE}login`)
        .send({ username: user.username, password: testUser.password })
        .expect(200);
};
