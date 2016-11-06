"use strict";
var CardPile = (function () {
    function CardPile(randomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
        this.pile = [];
    }
    CardPile.prototype.getCardCount = function () {
        return this.pile.length;
    };
    CardPile.prototype.addCardToPosition = function (card, position) {
        var next, current;
        current = card;
        for (var i = position; i < this.pile.length; i++) {
            next = this.pile[i];
            this.pile[i] = current;
            current = next;
        }
        this.pile.push(current);
    };
    CardPile.prototype.addCardToTop = function (card) {
        this.pile.push(card);
    };
    CardPile.prototype.addCardsToTop = function (cards) {
        for (var c in cards) {
            this.addCardToTop(cards[c]);
        }
    };
    CardPile.prototype.addCardToBottom = function (card) {
        this.addCardToPosition(card, 0);
    };
    CardPile.prototype.addCardsToBottom = function (cards) {
        for (var c in cards) {
            this.addCardToBottom(cards[c]);
        }
    };
    CardPile.prototype.addCardToRandomPosition = function (card) {
        var position = this.randomNumberGenerator.getInteger(this.getCardCount() + 1);
        this.addCardToPosition(card, position);
    };
    CardPile.prototype.addCardsToRandomPosition = function (cards) {
        for (var c in cards) {
            this.addCardToRandomPosition(cards[c]);
        }
    };
    CardPile.prototype.addCardsTo = function (position, cards) {
        switch (position) {
            case 0 /* Top */:
                this.addCardsToTop(cards);
                break;
            case 1 /* Bottom */:
                this.addCardsToBottom(cards);
                break;
            case 2 /* Random */:
                this.addCardsToRandomPosition(cards);
                break;
        }
    };
    CardPile.prototype.drawCard = function () {
        return this.pile.pop();
    };
    /**
     * This is the Fisher-Yates algorithm
     */
    CardPile.prototype.shuffle = function () {
        for (var i = this.getCardCount() - 1; i > 0; i--) {
            var j = this.randomNumberGenerator.getInteger(i + 1);
            _a = [this.pile[j], this.pile[i]], this.pile[i] = _a[0], this.pile[j] = _a[1];
        }
        var _a;
    };
    return CardPile;
}());
exports.__esModule = true;
exports["default"] = CardPile;
