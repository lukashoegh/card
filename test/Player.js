"use strict";
var chai = require("chai");
var Player_1 = require("../src/Player");
var Card_1 = require("../src/Card");
var should = chai.should();
var player;
describe("Player", function () {
    before(function () {
    });
    beforeEach(function () {
        player = new Player_1["default"]();
    });
    it("When a player is constructed they have no cards in their deck", function () {
        player.getCardList().length.should.equal(0);
    });
    it("When you add a card to the decklist, the size of the deck increases by one", function () {
        player.addCard(new Card_1["default"]());
        player.getCardList().length.should.equal(1);
    });
});
