"use strict";
var Player = (function () {
    function Player() {
        this.cardList = [];
    }
    Player.prototype.addCard = function (card) {
        this.cardList.push(card);
    };
    Player.prototype.getCardList = function () {
        return this.cardList;
    };
    return Player;
}());
exports.__esModule = true;
exports["default"] = Player;
