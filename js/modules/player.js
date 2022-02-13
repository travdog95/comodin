export default class Player {
  constructor(id, screenName, color, deck) {
    this.id = id;
    this.screenName = screenName;
    this.color = color;
    this.deck = deck;
    this.hand = [];

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
      const cards = await this.deck.drawCards(1);
    });
  }

  async dealHand(numCards) {
    const cards = await this.deck.drawCards(numCards);

    cards.forEach((card) => {
      this.addCardToHand(card);
    });
  }

  addCardToHand(card) {
    if (this.hand.length < 5) {
      const img = document.createElement("img");
      img.src = card.image;
      img.classList.add("card");
      this.handElement.appendChild(img);
    } else {
    }
  }
}
