import Player from "./Player";
import CardPile from "./CardPile";
import Card from "./Card";
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
    private seed: string;
    private prng: prng;
    private randomNumberGenerator: NumberGenerator;

    public constructor(players: Player[]) {
        this.setupRNG();
    }

    private setupRNG(): void {
        this.seed = getRandomString(this.seedlength);
        this.prng = seedrandom(this.seed);
        this.randomNumberGenerator = new RandomNumberGenerator(this.prng);
    }
}