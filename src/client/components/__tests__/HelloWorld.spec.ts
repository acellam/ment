import { expect } from "chai";
import "mocha";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "./../HelloWorld";

describe("HelloWorld", () => {
    test("renders props.msg when passed", () => {
        const msg = "new message";
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg }
        });
        expect(wrapper.text()).to.be(msg);
    });
});
