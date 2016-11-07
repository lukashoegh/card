"use strict";
var seedrandom = require("seedrandom");
var RandomNumberGenerator_1 = require("./NumberGenerator/RandomNumberGenerator");
var Utilities_1 = require("./Utilities");
var _ = require("underscore");
var Game = (function () {
    function Game(players) {
        /**
         * Configuration:
         */
        this.seedlength = 64;
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
            hand: []
        };
        return side;
    };
    Game.prototype.getSideFromPlayer = function (player) {
        return _.find(this.sides, function (side) {
            return side.player == player;
        });
    };
    return Game;
}());
exports.__esModule = true;
exports["default"] = Game;
