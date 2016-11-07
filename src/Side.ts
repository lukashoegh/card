import Player from "./Player";
import CardPile from "./CardPile";
import Card from "./Card";

export interface Side {
    player: Player;
    deck: CardPile;
    hand: Card[];
}

export default Side;