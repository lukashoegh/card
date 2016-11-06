"use strict";
var chai = require("chai");
var CardPile_1 = require("../src/CardPile");
var Card_1 = require("../src/Card");
var RandomNumberGenerator_1 = require("../src/NumberGenerator/RandomNumberGenerator");
var seedrandom = require("seedrandom");
var sinon = require("sinon");
var should = chai.should();
var cardPile, fiveCards, randomNumberGenerator;
var cardOne, cardTwo, cardThree, cardFour, numberedCards;
describe("CardPile", function () {
    before(function () {
        fiveCards = [new Card_1["default"](), new Card_1["default"](), new Card_1["default"](), new Card_1["default"](), new Card_1["default"]()];
        randomNumberGenerator = new RandomNumberGenerator_1["default"](seedrandom("test"));
        cardOne = new Card_1["default"](), cardTwo = new Card_1["default"], cardThree = new Card_1["default"](), cardFour = new Card_1["default"]();
        numberedCards = [cardOne, cardTwo, cardThree, cardFour];
    });
    beforeEach(function () {
        cardPile = new CardPile_1["default"](randomNumberGenerator);
    });
    it("When a cardpile is created it has size 0", function () {
        cardPile.getCardCount().should.equal(0);
    });
    it("When five cards are added to the top, the deck has size 5", function () {
        cardPile.addCardsTo(0 /* Top */, fiveCards);
        cardPile.getCardCount().should.equal(5);
    });
    it("When five cards are added to the bottom, the deck has size 5", function () {
        cardPile.addCardsTo(1 /* Bottom */, fiveCards);
        cardPile.getCardCount().should.equal(5);
    });
    it("You cannot draw a card from an empty pile", function () {
        should.not.exist(cardPile.drawCard());
    });
    it("If a card is added to a pile, you can draw it", function () {
        cardPile.addCardsTo(0 /* Top */, [cardOne]);
        cardPile.drawCard().should.equal(cardOne);
    });
    function drawCards(n) {
        for (var i = 0; i < n; i++) {
            cardPile.drawCard();
        }
    }
    it("You cannot draw more cards from the pile than you added", function () {
        cardPile.addCardsTo(0 /* Top */, fiveCards);
        drawCards(5);
        should.not.exist(cardPile.drawCard());
    });
    it("When a new card is added to a pile of size 5 at (random) position 2 (between the 2nd and 3rd card from the bottom), it will be the fourth card drawn", function () {
        cardPile.addCardsTo(0 /* Top */, fiveCards);
        var testCard = new Card_1["default"]();
        var stub = sinon.stub(randomNumberGenerator, "getInteger");
        stub.returns(2);
        cardPile.addCardsTo(2 /* Random */, [testCard]);
        cardPile.drawCard().should.not.equal(testCard);
        drawCards(2);
        cardPile.drawCard().should.equal(testCard);
        stub.restore();
    });
    it("When shuffling a deck, if the random generator returns the biggest possible number each time, the ordering of the deck isn't changed", function () {
        cardPile.addCardsTo(0 /* Top */, numberedCards);
        var stub = sinon.stub(randomNumberGenerator, "getInteger");
        stub.onCall(0).returns(3);
        stub.onCall(1).returns(2);
        stub.onCall(2).returns(1);
        stub.onCall(3).returns(0);
        cardPile.shuffle();
        cardPile.drawCard().should.equal(cardFour);
        cardPile.drawCard().should.equal(cardThree);
        cardPile.drawCard().should.equal(cardTwo);
        cardPile.drawCard().should.equal(cardOne);
        stub.restore();
    });
    it("When shuffling a deck, if the random generator returns 1 on all calls, the last element is moved to the front", function () {
        cardPile.addCardsTo(0 /* Top */, numberedCards);
        var stub = sinon.stub(randomNumberGenerator, "getInteger");
        stub.returns(0);
        cardPile.shuffle();
        cardPile.drawCard().should.equal(cardOne);
        stub.restore();
    });
});
