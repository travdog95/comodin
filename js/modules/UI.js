export default class UI {
  static gameBoardElement = document.querySelector("[data-game-board]");
  static paddleTemplate = document.querySelector("[data-paddle-template");
  static deckContainer = document.querySelector("[data-deck-container]");
  static messageElement = document.querySelector("[data-message]");

  static displayMessage(message) {
    this.messageElement.innerHTML = message;
  }

  static drawCard(card, player, message) {
    const img = document.createElement("img");
    img.src = card.image;
    img.classList.add("card");
    img.dataset.code = card.code;
    player.bindCardEvents(card, img);
    player.handElement.appendChild(img);
    if (message) this.displayMessage(message);
  }

  static discardCard(card, player) {
    player.discardPileElement.innerHTML = "";
    const img = document.createElement("img");
    img.src = card.image;
    img.classList.add("card");
    player.discardPileElement.appendChild(img);
    this.displayMessage(`${player.screenName} discarded the ${card.value} of ${card.suit}.`);
  }

  static removeCardFromHand(card, player) {
    const cardElement = player.handElement.querySelector(`[data-code="${card.code}"]`);
    player.handElement.removeChild(cardElement);
  }

  static highlightMoveableMarbles(moveableMarbles) {
    moveableMarbles.forEach((moveableMarble) => {
      moveableMarble.classList.add("moveable");
    });
  }

  static unHighlightMoveableMarbles() {
    const moveables = document.querySelectorAll(".paddle-item.moveable");
    moveables.forEach((moveable) => moveable.classList.remove("moveable"));
  }

  static selectMarble(marble, card) {}

  static moveMarble(fromElement, toElement, player) {
    // console.log("from", fromElement);
    const marbleNum = fromElement.dataset.marble;

    //remove data player and data marble
    delete fromElement.dataset.player;
    delete fromElement.dataset.marble;

    //set backgroundColor to white
    fromElement.classList.remove(player.color);

    // console.log("to", toElement);
    //Add data-player and data-marble
    toElement.dataset.player = player.id;
    toElement.dataset.marble = marbleNum;
    //Add class for color
    toElement.classList.add(player.color);
  }

  static sendMarbleToStart(marble) {}

  static sendMarbleToDoor(marble) {}
}
