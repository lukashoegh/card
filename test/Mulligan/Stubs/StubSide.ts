import Side from "../../../src/Side";
import Player from "../../../src/Player";
import CardPile from "../../../src/CardPile";
import Option from "../../../src/Option";
import Card from "../../../src/Card";
import RandomNumberGenerator from "../../../src/NumberGenerator/RandomNumberGenerator";

export default class StubSide implements Side {
    public player: Player;
    public deck: CardPile;
    public mulligan: Option<Card[]>;
    public hand: Card[];

    public constructor (randomNumberGenerator: RandomNumberGenerator) {
        this.player = new Player();
        this.deck =  new CardPile(randomNumberGenerator),
        this.mulligan = new Option<Card[]>();
        this.hand = [];
    }
}