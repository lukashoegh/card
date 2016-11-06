"use strict";
var Player_1 = require("../../../src/Player");
var CardPile_1 = require("../../../src/CardPile");
var Option_1 = require("../../../src/Option");
var StubSide = (function () {
    function StubSide(randomNumberGenerator) {
        this.player = new Player_1["default"]();
        this.deck = new CardPile_1["default"](randomNumberGenerator),
            this.mulligan = new Option_1["default"]();
        this.hand = [];
    }
    return StubSide;
}());
exports.__esModule = true;
exports["default"] = StubSide;
