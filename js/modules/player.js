import constants from "../constants.js";
import UI from "./UI.js";

export default class Player {
  constructor(id, screenName, color, deck, settings) {
    this.id = id;
    this.screenName = screenName;
    this.color = color;
    this.deck = deck;
    this.hand = [];
    this.marbles = {};
    this.settings = settings;
    this.paddleElement = "";
    this.discardedCard = {};
    this.deckElement = "";
    this.deckContainer = "";
    this.playerIconElement = "";
    this.handElement = "";
    this.discardPileElement = "";
    this.drawPileElement = "";
  }

  get marbleElements() {
    return document.querySelectorAll(`[data-player="${this.id}"]`);
  }

  get playableCards() {}

  // drawPileHandler() {
  //   this.drawPileElement.addEventListener("click", async (e) => {
  //     if (this.hand.length < this.settings.maxCardsInHand) {
  //       await this.drawCard();
  //     } else {
  //       UI.displayMessage("Hand is full!");
  //     }
  //   });
  // }

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

  findMovableMarbles(card) {
    let movableMarbles = [];
    this.marbleElements.forEach((marbleElement) => {
      //Marbles in start
      if (marbleElement.dataset.start) {
        if (constants.CARDS.EXIT_START.includes(card.value)) {
          movableMarbles.push(marbleElement);
        }
      }

      //Marbles on the track
      if (marbleElement.dataset.track) {
        if (!constants.CARDS.MOVE_BACKWARD.includes(card.value)) {
          movableMarbles.push(marbleElement);
        }
      }
    });

    return movableMarbles;
  }

  moveMarble(card, marbleElement) {
    let from = marbleElement;
    let toPositionValue = "";

    const marbleNum = marbleElement.dataset.marble;
    //Move marble
    //Move marble from start
    if (marbleElement.dataset.start) {
      if (constants.CARDS.EXIT_START.includes(card.value)) {
        //Update marbles property
        toPositionValue = `${this.id}-9`;
        this.marbles[marbleNum] = toPositionValue;
        //Update UI
        UI.moveMarble(
          from,
          this.paddleElement.querySelector(`[data-position="${toPositionValue}"]`),
          this
        );

        //End turn
        this.endTurn();
        return;
      }

      if (!constants.CARDS.MOVE_BACKWARD.includes(card.value)) {
      }

      //If marble on track

      //If marble in home
    }
  }

  cardEventHandlers(card, img) {
    // const moveableMarbles = this.findMovableMarbles(card);

    img.addEventListener("click", (e) => {
      if (Object.keys(this.discardedCard).length === 0) {
        UI.discardCard(card, this);
        this.removeCardFromHand(card);
        this.discardedCard = card;

        //Make moveable marbles clickable
        this.marbleEventHandlers(this.findMovableMarbles(card));
      } else {
        UI.displayMessage("Finish your turn!");
      }
    });

    img.addEventListener("mouseover", (e) => {
      //highlight moveableMarbles
      UI.highlightMoveableMarbles(this.findMovableMarbles(card));
    });

    img.addEventListener("mouseout", (e) => {
      UI.unHighlightMoveableMarbles();
    });
  }

  boundMarbleHandler = this.marbleHandler.bind(this);

  marbleEventHandlers(moveableMarbles) {
    moveableMarbles.forEach((marbleElement) => {
      marbleElement.classList.add("clickable");
      marbleElement.addEventListener("click", this.boundMarbleHandler);
    });
  }

  marbleHandler(e) {
    const marbleElement = e.target;
    this.moveMarble(this.discardedCard, marbleElement);
  }

  updateTrackAttributes() {
    const trackElements = this.paddleElement.querySelectorAll("[data-track]");
    trackElements.forEach((trackElement) => {
      const position = `${this.id}-${trackElement.dataset.position}`;
      trackElement.dataset.track = this.id;
      trackElement.dataset.position = position;
    });
  }

  removeMarbleClickability() {
    const clickableMarbles = document.querySelectorAll(".paddle-item.clickable");
    clickableMarbles.forEach((clickableMarble) => {
      clickableMarble.removeEventListener("click", this.marbleHandler);
      clickableMarble.classList.remove("clickable");
    });
  }

  async endTurn() {
    //Remove clickability from marble
    this.removeMarbleClickability();

    //Draw card
    await this.drawCard();

    //Clear discarded card
    this.discardedCard = {};

    //Find next player
  }

  async drawCard() {
    const cards = await this.deck.drawCards(1);
    const card = cards[0];
    this.hand.push(card);
    UI.drawCard(card, this, `${this.screenName} drew a card.`);
  }
}
