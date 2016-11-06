"use strict";
var Option_1 = require("../Option");
var _ = require("underscore");
var MulliganXCards = (function () {
    function MulliganXCards(maxMulligans) {
        this.maxMulligans = maxMulligans;
    }
    MulliganXCards.prototype.setMulligans = function (side, cards) {
        side.mulligan = new Option_1["default"](cards);
    };
    MulliganXCards.prototype.performMulligans = function (side, drawCard) {
        var cards = side.mulligan.getValue();
        var mulliganCount = cards.length;
        side.hand = _.difference(side.hand, cards);
        for (var i = 0; i < mulliganCount; i++) {
            drawCard(side);
        }
        side.deck.addCardsTo(2 /* Random */, cards);
    };
    return MulliganXCards;
}());
exports.__esModule = true;
exports["default"] = MulliganXCards;
