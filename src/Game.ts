import Player from "./Player";
import CardPile from "./CardPile";
import Card from "./Card";
import Option from "./Option";
import Side from "./Side";
import MulliganStrategy from "./Mulligan/MulliganStrategy";
import * as seedrandom from "seedrandom";
import RandomNumberGenerator from "./NumberGenerator/RandomNumberGenerator";
import NumberGenerator from "./NumberGenerator/NumberGenerator";
import { getRandomString } from "./Utilities";
import { CardPilePosition } from "./Enums";
import * as _ from "underscore";

export default class Game {

    /**
     * Configuration:
     */
    private seedlength = 64;
    private maxMulliganCount = 5;

    /**
     * Fields:
     */
    private sides: Side[];
    private seed: string;
    private prng: prng;
    private randomNumberGenerator: NumberGenerator;

    public constructor(players: Player[], private mulliganStrategy: MulliganStrategy) {
        this.setupRNG();

        this.sides = [];
        for (let p in players) {
            this.sides.push(this.createSide(players[p]));
        }
    }

    private setupRNG(): void {
        this.seed = getRandomString(this.seedlength);
        this.prng = seedrandom(this.seed);
        this.randomNumberGenerator = new RandomNumberGenerator(this.prng);
    }

    private createSide(player: Player): Side {
        let side: Side = {
            player: player,
            deck: null,
            mulligan: null,
            hand: []
        }

        this.setupDeck(side);
        this.drawHand(side);

        return side;
    }

    private setupDeck(side: Side): void {
        side.deck = new CardPile(this.randomNumberGenerator);
        side.deck.addCardsTo(CardPilePosition.Top, side.player.getDeckList());
        side.deck.shuffle();
    }

    private drawHand(side: Side): void {
        for (let i = 0; i < 5; i++) {
            this.drawCard(side);
        }
    }

    private drawCard(side: Side): void {
        side.hand.push(side.deck.drawCard());
    }

    private getSideFromPlayer(player: Player): Side {
        return _.find(this.sides, function (side) {
            return side.player == player;
        });
    }

    public getDrawPileSize(player: Player): number {
        return this.getSideFromPlayer(player).deck.getCardCount();
    }

    public getHealth(player: Player): number {
        return 20;
    }

    public getEnergy(player: Player): number {
        return 0;
    }

    public getHandSize(player: Player): number {
        return this.getHand(player).length;
    }

    public getHand(player: Player): Card[] {
        let side = this.getSideFromPlayer(player);
        return side.hand;
    }

    private startMulliganPhase(): void {
        this.resetMulligans();
        this.mulliganStrategy.setCallbacks(
            this.mulligan,
            this.startMulliganPhase,
            this.afterMulliganPhase
        );
        
    }

    private resetMulligans(): void {
        for(let side in this.sides) {
            this.sides[side].mulligan = new Option<Card[]>();  
        }
    }

    public setMulligans(player: Player, cards: Card[]): void {
        let side = this.getSideFromPlayer(player);
        this.mulliganStrategy.setMulligans(side, cards);

        //perform mulligans if everyone has set their intended mulligans
        let mulligansSet = true;
        for (let i in this.sides) {
            if (!this.sides[i].mulligan.valueIsPresent) mulligansSet = false;
        }
        if (mulligansSet) this.performMulligans();
    }

    private mulligan(player: Player, position: CardPilePosition, cards: Card[]): void {
        let side = this.getSideFromPlayer(player);
        side.hand = _.difference(side.hand, cards);
        let mulliganCount = cards.length;
        for (let i = 0; i < mulliganCount; i++) {
            this.drawCard(side);
        }
        side.deck.addCardsTo(position, cards);
    }

    private performMulligans(): void {
        for (let i in this.sides) {
            let side = this.sides[i];
            this.mulliganStrategy.performMulligans(side, this.drawCard);
        }
    }



}