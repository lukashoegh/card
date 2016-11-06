import Card from "./Card";
import NumberGenerator from "./NumberGenerator/NumberGenerator";
import { CardPilePosition } from "./Enums";

export default class CardPile {
    private pile: Card[];

    public constructor(private randomNumberGenerator: NumberGenerator) {
        this.pile = [];
    }

    public getCardCount(): number {
        return this.pile.length;
    }

    private addCardToPosition(card: Card, position: number): void {
        let next: Card, current: Card;
        current = card;
        for (let i = position; i < this.pile.length; i++) {
            next = this.pile[i];
            this.pile[i] = current;
            current = next;
        }
        this.pile.push(current);
    }

    private addCardToTop(card: Card): void {
        this.pile.push(card);
    }

    private addCardsToTop(cards: Card[]): void {
        for (let c in cards) {
            this.addCardToTop(cards[c]);
        }
    }

    private addCardToBottom(card: Card): void {
        this.addCardToPosition(card, 0);
    }

    private addCardsToBottom(cards: Card[]): void {
        for (let c in cards) {
            this.addCardToBottom(cards[c]);
        }
    }

    private addCardToRandomPosition(card: Card): void {
        let position = this.randomNumberGenerator.getInteger(this.getCardCount() + 1);
        this.addCardToPosition(card, position);
    }

    private addCardsToRandomPosition(cards: Card[]): void {
        for (let c in cards) {
            this.addCardToRandomPosition(cards[c]);
        }
    }

    public addCardsTo(position: CardPilePosition, cards: Card[]): void {
        switch (position) {
            case CardPilePosition.Top:
                this.addCardsToTop(cards);
                break;
            case CardPilePosition.Bottom:
                this.addCardsToBottom(cards);
                break;
            case CardPilePosition.Random:
                this.addCardsToRandomPosition(cards);
                break;
        }
    }

    public drawCard(): Card {
        return this.pile.pop();
    }

    /**
     * This is the Fisher-Yates algorithm
     */
    public shuffle(): void {
        for (let i = this.getCardCount() - 1; i > 0; i--) {
            let j = this.randomNumberGenerator.getInteger(i + 1);
            [this.pile[i], this.pile[j]] = [this.pile[j], this.pile[i]];
        }
    }
}