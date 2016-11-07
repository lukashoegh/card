"use strict";
var seedrandom = require("seedrandom");
var RandomNumberGenerator_1 = require("./NumberGenerator/RandomNumberGenerator");
var Utilities_1 = require("./Utilities");
var Game = (function () {
    function Game(players) {
        /**
         * Configuration:
         */
        this.seedlength = 64;
        this.setupRNG();
    }
    Game.prototype.setupRNG = function () {
        this.seed = Utilities_1.getRandomString(this.seedlength);
        this.prng = seedrandom(this.seed);
        this.randomNumberGenerator = new RandomNumberGenerator_1["default"](this.prng);
    };
    return Game;
}());
exports.__esModule = true;
exports["default"] = Game;
