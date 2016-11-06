"use strict";
var CardPile_1 = require("./CardPile");
var Option_1 = require("./Option");
var seedrandom = require("seedrandom");
var RandomNumberGenerator_1 = require("./NumberGenerator/RandomNumberGenerator");
var Utilities_1 = require("./Utilities");
var _ = require("underscore");
var Game = (function () {
    function Game(players, mulliganStrategy) {
        this.mulliganStrategy = mulliganStrategy;
        /**
         * Configuration:
         */
        this.seedlength = 64;
        this.maxMulliganCount = 5;
        this.setupRNG();
        this.sides = [];
        for (var p in players) {
            this.sides.push(this.createSide(players[p]));
        }
    }
    Game.prototype.setupRNG = function () {
        this.seed = Utilities_1.getRandomString(this.seedlength);
        this.prng = seedrandom(this.seed);
        this.randomNumberGenerator = new RandomNumberGenerator_1["default"](this.prng);
    };
    Game.prototype.createSide = function (player) {
        var side = {
            player: player,
            deck: null,
            mulligan: null,
            hand: []
        };
        this.setupDeck(side);
        this.drawHand(side);
        return side;
    };
    Game.prototype.setupDeck = function (side) {
        side.deck = new CardPile_1["default"](this.randomNumberGenerator);
        side.deck.addCardsTo(0 /* Top */, side.player.getDeckList());
        side.deck.shuffle();
    };
    Game.prototype.drawHand = function (side) {
        for (var i = 0; i < 5; i++) {
            this.drawCard(side);
        }
    };
    Game.prototype.drawCard = function (side) {
        side.hand.push(side.deck.drawCard());
    };
    Game.prototype.getSideFromPlayer = function (player) {
        return _.find(this.sides, function (side) {
            return side.player == player;
        });
    };
    Game.prototype.getDrawPileSize = function (player) {
        return this.getSideFromPlayer(player).deck.getCardCount();
    };
    Game.prototype.getHealth = function (player) {
        return 20;
    };
    Game.prototype.getEnergy = function (player) {
        return 0;
    };
    Game.prototype.getHandSize = function (player) {
        return this.getHand(player).length;
    };
    Game.prototype.getHand = function (player) {
        var side = this.getSideFromPlayer(player);
        return side.hand;
    };
    Game.prototype.startMulliganPhase = function () {
        this.resetMulligans();
        this.mulliganStrategy.setCallbacks(this.mulligan, this.startMulliganPhase, this.afterMulliganPhase);
    };
    Game.prototype.resetMulligans = function () {
        for (var side in this.sides) {
            this.sides[side].mulligan = new Option_1["default"]();
        }
    };
    Game.prototype.setMulligans = function (player, cards) {
        var side = this.getSideFromPlayer(player);
        this.mulliganStrategy.setMulligans(side, cards);
        //perform mulligans if everyone has set their intended mulligans
        var mulligansSet = true;
        for (var i in this.sides) {
            if (!this.sides[i].mulligan.valueIsPresent)
                mulligansSet = false;
        }
        if (mulligansSet)
            this.performMulligans();
    };
    Game.prototype.mulligan = function (player, position, cards) {
        var side = this.getSideFromPlayer(player);
        side.hand = _.difference(side.hand, cards);
        var mulliganCount = cards.length;
        for (var i = 0; i < mulliganCount; i++) {
            this.drawCard(side);
        }
        side.deck.addCardsTo(position, cards);
    };
    Game.prototype.performMulligans = function () {
        for (var i in this.sides) {
            var side = this.sides[i];
            this.mulliganStrategy.performMulligans(side, this.drawCard);
        }
    };
    return Game;
}());
exports.__esModule = true;
exports["default"] = Game;
