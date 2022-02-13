import Constants from "../constants.js";

export default class Deck {
  constructor(numberOfDecks, id) {
    this.numberOfDecks = numberOfDecks;
    this.id = id;
  }

  async drawCards(numCards) {
    const response = await fetch(
      `${Constants.DECK_OF_CARDS_API}${this.id}/draw/?count=${numCards}`
    );

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      const cards = data.cards;

      return cards;
    } else {
      return null;
    }
  }
}
