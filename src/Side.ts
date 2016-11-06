import Player from "./Player";
import CardPile from "./CardPile";
import Card from "./Card";
import Option from "./Option";

export interface Side {
    player: Player;
    deck: CardPile;
    mulligan: Option<Card[]>;
    hand: Card[];
}

export default Side;