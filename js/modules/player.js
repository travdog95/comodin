import UI from "./UI.js";

export default class Player {
  constructor(id, screenName, color, deck, settings) {
    this.id = id;
    this.screenName = screenName;
    this.color = color;
    this.deck = deck;
    this.hand = [];
    this.settings = settings;

    this.init();
  }

  get deckElement() {
    return document.querySelector(`[data-player-deck="${this.id}"]`);
  }

  get drawPileElement() {
    return this.deckElement.querySelector("[data-draw-pile]");
  }

  get discardPileElement() {
    return this.deckElement.querySelector("[data-discard-pile]");
  }

  get handElement() {
    return this.deckElement.querySelector("[data-hand]");
  }

  async init() {
    this.drawPileElement.addEventListener("click", async (e) => {
      if (this.hand.length < this.settings.maxCardsInHand) {
        const cards = await this.deck.drawCards(1);
        const card = cards[0];
        this.hand.push(card);
        UI.drawCard(card, this);
      } else {
        UI.displayMessage("Hand is full!");
      }
    });
  }

  async dealHand(numCards) {
    const cards = await this.deck.drawCards(numCards);

    cards.forEach((card) => {
      UI.drawCard(card, this);
      this.hand.push(card);
    });
  }

  removeCardFromHand(card) {
    let newHand = [];
    this.hand.forEach((cardInHand) => {
      if (card.code === cardInHand.code) {
        UI.removeCardFromHand(card, this);
      } else {
        newHand.push(cardInHand);
      }
    });

    this.hand = newHand;
  }
}
