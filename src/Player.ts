import Card from "./Card";

export default class Player {
    private cardList: Card[];

    public constructor() {
        this.cardList = [];
    }

    public addCard(card: Card): void {
        this.cardList.push(card);
    }

    public getCardList(): Card[] {
        return this.cardList;
    }
}