"use strict";
var chai = require("chai");
var Game_1 = require("../src/Game");
var Player_1 = require("../src/Player");
var Card_1 = require("../src/Card");
var MulliganXCards_1 = require("../src/Mulligan/MulliganXCards");
var should = chai.should();
chai.config.truncateThreshold = 0;
var game;
var player1, player2;
var players;
var mulliganStrategy;
function giveBasicDeckList(player) {
    for (var i = 0; i < 20; i++) {
        player.addCard(new Card_1["default"](i + ''));
    }
}
describe("Game before mulligan phase", function () {
    before(function () {
        player1 = new Player_1["default"]();
        player2 = new Player_1["default"]();
        players = [player1, player2];
        giveBasicDeckList(player1);
        giveBasicDeckList(player2);
        mulliganStrategy = new MulliganXCards_1["default"](5);
    });
    beforeEach(function () {
        game = new Game_1["default"](players, mulliganStrategy);
    });
    it("When the game starts, the cards from player one's decklist is added to his deck", function () {
        (game.getDrawPileSize(player1) + game.getHandSize(player1)).should.equal(20);
    });
    it("Player one has 20 life", function () {
        game.getHealth(player1).should.equal(20);
    });
    it("Player one has 0 energy", function () {
        game.getEnergy(player1).should.equal(0);
    });
    it("Player one has a hand of 5 cards", function () {
        game.getHandSize(player1).should.equal(5);
        game.getHand(player1).should.be.an('Array').and.have.property("length", 5);
        game.getHand(player1)[0].should.be.an("Object");
    });
    it("The cards from player one's hand are part of his deck", function () {
        player1.getDeckList().should.include.members(game.getHand(player1));
    });
});
describe("Game during mulligan phase", function () {
    before(function () {
        player1 = new Player_1["default"]();
        player2 = new Player_1["default"]();
        players = [player1, player2];
        giveBasicDeckList(player1);
        giveBasicDeckList(player2);
        mulliganStrategy = new MulliganXCards_1["default"](3);
    });
    beforeEach(function () {
        game = new Game_1["default"](players, mulliganStrategy);
    });
    it("If player one mulligans his first card, his hand now contains 5 cards, of which the first card is a new card", function () {
        var card1 = game.getHand(player1)[0];
        game.setMulligans(player1, [card1]);
        game.setMulligans(player2, []);
        game.getHandSize(player1).should.equal(5);
        card1.should.not.be.oneOf(game.getHand(player1));
    });
    it("If player two mulligans his fourth and fifth card, his hand now contains 5 cards, not including those cards", function () {
        var card4 = game.getHand(player2)[3];
        var card5 = game.getHand(player2)[4];
        game.setMulligans(player2, [card4, card5]);
        game.setMulligans(player1, []);
        game.getHandSize(player2).should.equal(5);
        game.getHand(player2).should.not.include.members([card4, card5]);
    });
    it("If a player mulligans no cards, his hand doesn't change", function () {
        var hand = game.getHand(player1);
        game.setMulligans(player1, []);
        game.setMulligans(player2, []);
        game.getHand(player1).should.include.members(hand);
        hand.should.include.members(game.getHand(player1));
    });
});
describe("Game after mulligan phase", function () {
    before(function () {
        player1 = new Player_1["default"]();
        player2 = new Player_1["default"]();
        players = [player1, player2];
        giveBasicDeckList(player1);
        giveBasicDeckList(player2);
        mulliganStrategy = new MulliganXCards_1["default"](5);
    });
    beforeEach(function () {
        game = new Game_1["default"](players, mulliganStrategy);
        game.setMulligans(player1, []);
        game.setMulligans(player2, []);
    });
    it("");
});
