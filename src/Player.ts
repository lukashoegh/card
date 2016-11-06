import Card from "./Card";

export default class Player {
    private deckList: Card[];

    public constructor() {
        this.deckList = [];
    }

    public addCard(card: Card): void {
        this.deckList.push(card);
    }

    public getDeckList(): Card[] {
        return this.deckList;
    }
}