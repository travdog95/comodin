import Constants from "../constants.js";

export default class Deck {
  constructor(numberOfDecks = 1) {
    this.numberOfDecks = numberOfDecks;
    this.id = null;

    this.newDeck();
  }

  newDeck() {
    fetch(`${Constants.DECK_OF_CARDS_API}new/shuffle/?deck_count=${this.numberOfDecks}`)
      .then((response) => response.json())
      .then((result) => {
        this.id = result.deck_id;
      })
      .catch((error) => {
        console.error("Error:", error);
        this.id = null;
      });
  }

  async drawCard() {
    const response = await fetch(`${Constants.DECK_OF_CARDS_API}${this.id}/draw/?count=1`);

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      const card = data.cards[0];

      return card;
    } else {
      return null;
    }
  }
}
