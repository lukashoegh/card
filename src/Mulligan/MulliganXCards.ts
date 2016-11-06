import MulliganStrategy from "./MulliganStrategy";
import Side from "../Side";
import Card from "../Card";
import Option from "../Option";
import { CardPilePosition } from "../Enums";
import * as _ from "underscore";

export default class MulliganXCards implements MulliganStrategy {

    constructor(private maxMulligans: number) { }

    public setMulligans(side: Side, cards: Card[]): void {
        side.mulligan = new Option<Card[]>(cards);
    }

    public performMulligans(side: Side, drawCard: (side: Side) => void): void {
        let cards = side.mulligan.getValue();
        let mulliganCount = cards.length;
        side.hand = _.difference(side.hand, cards);
        for (let i = 0; i < mulliganCount; i++) {
            drawCard(side);
        }
        side.deck.addCardsTo(CardPilePosition.Random, cards);
    }
}