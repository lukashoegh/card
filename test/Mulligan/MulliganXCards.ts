import * as chai from "chai";
import MulliganXCards from "../../src/Mulligan/MulliganXCards";
import * as sinon from "sinon";

import Side from "../../src/Side";
import Card from "../../src/Card";
import Player from "../../src/Player";
import CardPile from "../../src/CardPile";
import Option from "../../src/Option";
import RandomNumberGenerator from "../../src/NumberGenerator/RandomNumberGenerator";
import StubSide from "./Stubs/StubSide";

let player: Player;
let side: Side;
let deck: CardPile;
let randomNumberGenerator: RandomNumberGenerator;

function giveBasicDeckList(player: Player) {
    for (let i = 0; i < 20; i++) {
        player.addCard(new Card(i + ''));
    }
}

describe("MulliganXCards", function () {

    before(function () {
        randomNumberGenerator = new RandomNumberGenerator(seedrandom("test"));
        side = new StubSide(randomNumberGenerator);
        player = side.player;
        giveBasicDeckList(player);
    });

    beforeEach(function () {

    });

    it("If less than ", function () {

    });
});