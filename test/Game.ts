import * as chai from "chai";
import * as sinon from "sinon";

import Game from "../src/Game";
import Player from "../src/Player";
import Card from "../src/Card";
import MulliganXCards from "../src/Mulligan/MulliganXCards";

const should = chai.should();
chai.config.truncateThreshold = 0;

let game: Game;
let player1: Player, player2: Player;
let players: Player[];
let mulliganStrategy: MulliganXCards;

function giveBasicDeckList (player: Player) {
	for(let i = 0; i < 20; i++) {
		player.addCard(new Card(i + ''));
	}
}

describe("Game before mulligan phase", function () {

    before(function () {
		player1 = new Player();
		player2 = new Player();
		players = [player1, player2];
		giveBasicDeckList(player1);
		giveBasicDeckList(player2);
		mulliganStrategy = new MulliganXCards(5);
	});

    beforeEach(function () {
        game = new Game(players, mulliganStrategy);
    });

	it("When the game starts, the cards from player one's decklist is added to his deck", function () {
		(game.getDrawPileSize(player1) + game.getHandSize(player1)).should.equal(20);
	});

	it("Player one has 20 life", function () {
		game.getHealth(player1).should.equal(20);
	});

	it("Player one has 0 energy", function () {
		game.getEnergy(player1).should.equal(0);
	});

	it("Player one has a hand of 5 cards", function () {
		game.getHandSize(player1).should.equal(5);
		game.getHand(player1).should.be.an('Array').and.have.property("length", 5);
		game.getHand(player1)[0].should.be.an("Object");
	});

	it("The cards from player one's hand are part of his deck", function () {
		player1.getDeckList().should.include.members(game.getHand(player1));
	});
});


describe("Game during mulligan phase", function () {

    before(function () {
		player1 = new Player();
		player2 = new Player();
		players = [player1, player2];
		giveBasicDeckList(player1);
		giveBasicDeckList(player2);
		mulliganStrategy = new MulliganXCards(3);
	});

    beforeEach(function () {
        game = new Game(players, mulliganStrategy);
    });

	it("If player one mulligans his first card, his hand now contains 5 cards, of which the first card is a new card", function () {
		let card1 = game.getHand(player1)[0];
		game.setMulligans(player1, [card1]);
		game.setMulligans(player2, []);
		game.getHandSize(player1).should.equal(5);
		card1.should.not.be.oneOf(game.getHand(player1));
	});

	it("If player two mulligans his fourth and fifth card, his hand now contains 5 cards, not including those cards", function () {
		let card4 = game.getHand(player2)[3];
		let card5 = game.getHand(player2)[4];
		game.setMulligans(player2, [card4, card5]);
		game.setMulligans(player1, []);
		game.getHandSize(player2).should.equal(5);
		game.getHand(player2).should.not.include.members([card4, card5]);
	});

	it("If a player mulligans no cards, his hand doesn't change", function () {
		let hand = game.getHand(player1);
		game.setMulligans(player1, []);
		game.setMulligans(player2, []);
		game.getHand(player1).should.include.members(hand);
		hand.should.include.members(game.getHand(player1));
	});

});


describe("Game after mulligan phase", function () {

    before(function () {
		player1 = new Player();
		player2 = new Player();
		players = [player1, player2];
		giveBasicDeckList(player1);
		giveBasicDeckList(player2);
		mulliganStrategy = new MulliganXCards(5);
	});

    beforeEach(function () {
        game = new Game(players, mulliganStrategy);
		game.setMulligans(player1, []);
		game.setMulligans(player2, []);
    });

	it("")
	
});