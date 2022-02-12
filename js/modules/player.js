import Constants from "../constants.js";

export default class Player {
  constructor(id, screenName, color, deck) {
    this.id = id;
    this.screenName = screenName;
    this.color = color;
    this.deck = deck;

    this.init();
  }

  init() {
    const deckElement = document.querySelector(`[data-player-deck="${this.id}"]`);
    const drawPileElement = deckElement.querySelector("[data-draw-pile]");
    const discardPileElement = deckElement.querySelector("[data-discard-pile]");
    const discardImageElement = discardPileElement.querySelector("img");

    drawPileElement.addEventListener("click", (e) => {
      const result = this.deck.drawCard();

      result.then((card) => {
        discardImageElement.src = card.image;
      });
    });
  }
}
