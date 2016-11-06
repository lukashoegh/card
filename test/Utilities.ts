import * as chai from "chai";
import * as Utilities from "../src/Utilities";
import * as sinon from "sinon";

describe("Utilities", function () {

    it("The random seed generator should return a seed of the required length", function () {
        Utilities.getRandomString(20).length.should.equal(20);
    });

    it("The random seed generator should produce the same result if the rng method is fixed", function () {
        let stub = sinon.stub(Math, "random");
        stub.returns(0.5);
        Utilities.getRandomString(20).should.equal(Utilities.getRandomString(20));
        stub.restore();
    });
});