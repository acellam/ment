// tslint:disable
import { expect } from "chai";

import { login, request } from "./common";
import { cleanCollection } from "../models/user";

describe("# WebAuth", () => {
    const endpoint = process.env.API_BASE + "login";

    it("should retrieve the token", () => {
        return cleanCollection().then(_res => {
            return login().then(res => {
                expect(res.status).to.equal(200);
                expect(res.body.token).not.to.empty
            });
        });
    });

    it("should not login with the right user but wrong password", () => {
        return request.post(endpoint)
            .send({ username: "testuser", password: "anythingGoesHere" })
            .expect(401);
    });

    it("should return invalid credentials error", () => {
        return request.post(endpoint)
            .send({ username: "testuser", password: "" })
            .expect(401)
            .then((_res: any) => {
                return request.post(endpoint)
                    .send({ username: "anotherusername", password: "mypass" })
                    .expect(401);
            });
    });

    it("should return token expired message", () => {
        return request.post(process.env.API_BASE + "contact")
            .set("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTg5Mzk1MTksInVzZXJuYW1lIjoidGVzdHVzZXIifQ.FUJcVCzZTkjDr62MCJj5gvCFvmxewmz2jotiknuVbOg")
            .send({
                firstName: "User one",
                lastName: "User one last"
            })
            .expect((res: any) => expect(res.body.message).to.equal("Your token has expired. Please generate a new one"))
            .expect(401);
    });
});
