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

    this.init();
  }

  get deckContainer() {
    return document.querySelector(`[data-deck-container="${this.id}"]`);
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

  get marbleElements() {
    return document.querySelectorAll(`[data-player="${this.id}"]`);
  }

  get playerIconElement() {
    return this.deckContainer.querySelector("[data-player-icon]");
  }

  // get marblePositionElements() {
  //   let elements = [];
  //   console.lo;

  //   this.marbleElements.forEach((marbleElement) => {
  //     elements.push(marbleElement.dataset.position);
  //   });
  //   return elements;
  // }

  get playableCards() {}

  async init() {
    this.drawPileElement.addEventListener("click", async (e) => {
      if (this.hand.length < this.settings.maxCardsInHand) {
        await this.drawCard();
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

  findMovableMarbles(card) {
    let movableMarbles = [];
    this.marbleElements.forEach((marbleElement) => {
      //Marbles in start
      if (marbleElement.dataset.start !== undefined) {
        if (constants.CARDS.EXIT_START.includes(card.value)) {
          movableMarbles.push(marbleElement);
        }
      }
    });

    return movableMarbles;
  }

  bindCardEvents(card, img) {
    const moveableMarbles = this.findMovableMarbles(card);

    img.addEventListener("click", (e) => {
      if (Object.keys(this.discardedCard).length === 0) {
        UI.discardCard(card, this);
        this.removeCardFromHand(card);
        this.discardedCard = card;

        //Make moveable marbles clickable
        this.bindMarbleEvents(moveableMarbles);
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

  bindMarbleEvents(moveableMarbles) {
    moveableMarbles.forEach((marbleElement) => {
      marbleElement.classList.add("clickable");
      marbleElement.addEventListener("click", this.boundMarbleHandler);
    });
  }

  marbleHandler(e) {
    const marbleElement = e.target;
    this.moveMarble(this.discardedCard, marbleElement);
  }

  async moveMarble(card, marbleElement) {
    if (card !== undefined && marbleElement !== undefined) {
      let from = marbleElement;
      let toPositionValue = "";

      const marbleNum = marbleElement.dataset.marble;
      //Move marble
      if (marbleElement.querySelector("[data-start") !== undefined) {
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

          //Remove clickability from marble
          this.removeMarbleClickability();

          //Draw card
          await this.drawCard();

          //Determine who's next
          this.endTurn();
        }
      }
    }
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

  endTurn() {
    this.discardedCard = {};
  }

  async drawCard() {
    const cards = await this.deck.drawCards(1);
    const card = cards[0];
    this.hand.push(card);
    UI.drawCard(card, this, `${this.screenName} drew a card.`);
  }
}
