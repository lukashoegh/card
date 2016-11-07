import Player from "./Player";
import CardPile from "./CardPile";
import Card from "./Card";
import Side from "./Side";
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

    /**
     * Fields:
     */
    private sides: Side[];
    private seed: string;
    private prng: prng;
    private randomNumberGenerator: NumberGenerator;

    public constructor(players: Player[]) {
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
            hand: []
        }
        return side;
    }
    
    private getSideFromPlayer(player: Player): Side {
        return _.find(this.sides, function (side) {
            return side.player == player;
        });
    }
}