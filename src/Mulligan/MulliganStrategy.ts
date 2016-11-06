import Card from "../Card";
import Side from "../Side";

interface MulliganStrategy {
    setMulligans(side: Side, cards: Card[]): void;
    performMulligans(sides: Side, drawCard: (side: Side) => void): void;
}

export default MulliganStrategy;