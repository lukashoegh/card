"use strict";
var seedrandom = require("seedrandom");
var Utilities_1 = require("../src/Utilities");
var r1, r2;
describe("seedrandom", function () {
    it("Two rngs seeded identically should produce the same result", function () {
        var seed = Utilities_1.getRandomString(64);
        r1 = seedrandom(seed), r2 = seedrandom(seed);
        r1().should.equal(r2());
        r1().should.equal(r2());
        r1().should.equal(r2());
    });
});
