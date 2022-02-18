export default class UI {
  static gameBoardElement = document.querySelector("[data-game-board]");
  static paddleTemplate = document.querySelector("[data-paddle-template");
  static deckContainer = document.querySelector("[data-deck-container]");
  static messageElement = document.querySelector("[data-message]");

  static displayMessage(message) {
    this.messageElement.innerHTML = message;
  }

  static drawCard(card, player) {
    const img = document.createElement("img");
    img.src = card.image;
    img.classList.add("card");
    img.dataset.code = card.code;
    img.addEventListener("click", (e) => {
      this.discardCard(card, player);
      player.removeCardFromHand(card);
    });
    player.handElement.appendChild(img);
  }

  static discardCard(card, player) {
    player.discardPileElement.innerHTML = "";
    const img = document.createElement("img");
    img.src = card.image;
    img.classList.add("card");
    player.discardPileElement.appendChild(img);
  }

  static removeCardFromHand(card, player) {
    const cardElement = player.handElement.querySelector(`[data-code="${card.code}"]`);
    player.handElement.removeChild(cardElement);
  }

  static selectMarble(marble, card) {}

  static moveMarble(marble) {}

  static sendMarbleToStart(marble) {}

  static sendMarbleToDoor(marble) {}
}
