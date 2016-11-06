"use strict";
var Card_1 = require("../../src/Card");
var RandomNumberGenerator_1 = require("../../src/NumberGenerator/RandomNumberGenerator");
var StubSide_1 = require("./Stubs/StubSide");
var player;
var side;
var deck;
var randomNumberGenerator;
function giveBasicDeckList(player) {
    for (var i = 0; i < 20; i++) {
        player.addCard(new Card_1["default"](i + ''));
    }
}
describe("MulliganXCards", function () {
    before(function () {
        randomNumberGenerator = new RandomNumberGenerator_1["default"](seedrandom("test"));
        side = new StubSide_1["default"](randomNumberGenerator);
        player = side.player;
        giveBasicDeckList(player);
    });
    beforeEach(function () {
    });
    it("If less than ", function () {
    });
});
