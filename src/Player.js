"use strict";
var Player = (function () {
    function Player() {
        this.deckList = [];
    }
    Player.prototype.addCard = function (card) {
        this.deckList.push(card);
    };
    Player.prototype.getDeckList = function () {
        return this.deckList;
    };
    return Player;
}());
exports.__esModule = true;
exports["default"] = Player;
