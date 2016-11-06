import * as chai from "chai";
import * as seedrandom from "seedrandom";
import {getRandomString} from "../src/Utilities";
let r1: prng, r2: prng;

describe("seedrandom", function () {    
    
    it("Two rngs seeded identically should produce the same result", function () {
        let seed = getRandomString(64);
        r1 = seedrandom(seed), r2 = seedrandom(seed);
        r1().should.equal(r2());
        r1().should.equal(r2());
        r1().should.equal(r2());
    });

});