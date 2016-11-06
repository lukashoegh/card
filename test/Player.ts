import * as chai from "chai";
import Player from "../src/Player";
import Card from "../src/Card";

const should = chai.should();
let player: Player;

describe("Player", function () {

    before(function () {
	});

    beforeEach(function () {
        player = new Player();
    });

    it("When a player is constructed they have no cards in their deck", function () {
        player.getDeckList().length.should.equal(0);
    })

	it("When you add a card to the decklist, the size of the deck increases by one", function () {
		player.addCard(new Card())
		player.getDeckList().length.should.equal(1);
	})
})