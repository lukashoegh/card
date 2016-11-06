"use strict";
var Option_1 = require("../src/Option");
describe("Option", function () {
    it("After creating an option with value, its value is present", function () {
        var option = new Option_1["default"](5);
        option.valueIsPresent.should.be.true;
    });
    it("After creating an option with value, its value can be accessed", function () {
        var option = new Option_1["default"](5);
        option.getValue().should.equal(5);
    });
    it("After creating an option without a value, its value is not present", function () {
        var option = new Option_1["default"]();
        option.valueIsPresent.should.be.false;
    });
    it("After creating an option without value, accessing its value throws an exception", function () {
        (function () {
            var option = new Option_1["default"]();
            option.getValue();
        }).should.throw(ReferenceError);
    });
});
