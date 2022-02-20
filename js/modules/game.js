import UI from "./UI.js";

export default class Game {
  constructor(players, settings) {
    this.id = this.newId;
    this.players = players;
    this.settings = settings;
    this.turn = players[0].id;
  }

  get newId() {
    return Date.now();
  }

  get numPlayers() {
    return this.playerNames.length;
  }

  async startNewGame() {
    //Display paddles
    this.players.forEach((player, playerIndex) => {
      //Create paddle
      const paddle = UI.paddleTemplate.content.cloneNode(true).children[0];

      paddle.dataset.paddle = player.id;

      player.paddleElement = paddle;

      //Update data-track & data-position data attributes
      player.updateTrackAttributes();

      //Load player marbles into start positions
      const startPositions = paddle.querySelectorAll("[data-start]");

      startPositions.forEach((position, index) => {
        const marbleNum = index + 1;
        position.setAttribute("data-marble", `${marbleNum}`);
        position.setAttribute("data-player", `${player.id}`);
        player.marbles[marbleNum] = position.dataset.position;
        position.classList.add(player.color);
        player.playerIconElement.classList.add(player.color);
      });

      //Add paddle to board
      UI.gameBoardElement.append(paddle);

      //if first player, rotate paddle 180
      if (playerIndex === 0) {
        paddle.classList.add("rotate-180");
      }

      //
      player.dealHand(this.settings.maxCardsInHand);
    });
  }
}
