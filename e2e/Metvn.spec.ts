import { expect } from "chai";
import "mocha";
import HomePage from "./pages/home.page";

const testValue = "Hello World";

describe("METVN", () => {
    it("content is updated by attribute", () => {
        HomePage.open();

        const content = HomePage.span1.getHTML(false);
        expect(content).to.equal(testValue);
    });
});
