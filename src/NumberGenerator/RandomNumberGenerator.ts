import NumberGenerator from "./NumberGenerator";
import * as seedrandom from "seedrandom";

export default class RandomNumberGenerator implements NumberGenerator {
    public constructor (private prng: prng) { }

    /* istanbul ignore next */
    public getInteger(max: number): number {
        return Math.floor(this.prng()*max);
    }
}