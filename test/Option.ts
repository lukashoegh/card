import * as chai from "chai";
import Option from "../src/Option";
import * as sinon from "sinon";

describe("Option", function () {

    it("After creating an option with value, its value is present", function () {
        let option = new Option<number>(5);
        option.valueIsPresent.should.be.true
    });

    it("After creating an option with value, its value can be accessed", function () {
        let option = new Option<number>(5);
        option.getValue().should.equal(5);
    });

    it("After creating an option without a value, its value is not present", function () {
        let option = new Option<number>();
        option.valueIsPresent.should.be.false;
    });

    it("After creating an option without value, accessing its value throws an exception", function () {
        (function () {
            let option = new Option<number>();
            option.getValue();
        }).should.throw(ReferenceError);
    });



});