export default class Game {
  constructor(players) {
    this.id = null;
    this.data = {};
    this.players = players;
  }

  get newId() {
    return Date.now();
  }

  get numPlayers() {
    return this.players.length;
  }

  get paddleTemplate() {
    return document.querySelector("[data-paddle-template");
  }

  get gameBoardElement() {
    return document.querySelector("[data-game-board]");
  }

  get deckContainer() {
    return document.querySelector("[data-deck-container]");
  }

  startNewGame() {
    this.id = this.newId;

    //Display paddles
    this.players.forEach((player, playerIndex) => {
      //Create paddle
      const paddle = this.paddleTemplate.content.cloneNode(true).children[0];

      //Load player marbles into start positions
      const startPositions = paddle.querySelectorAll("[data-start]");

      startPositions.forEach((position) => {
        position.setAttribute("data-marble", player.id);
        position.style.backgroundColor = player.color;
      });

      //Add paddle to board
      this.gameBoardElement.append(paddle);

      //if first player, rotate paddle 180
      if (playerIndex === 0) {
        paddle.classList.add("rotate-180");
      }

      //Load decks
    });
  }
}
