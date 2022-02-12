import Game from "./modules/game.js";
import Player from "./modules/player.js";
import Deck from "./modules/deck.js";

const players = [
  new Player(1, "Travis", "Red", new Deck()),
  new Player(2, "Kimmo", "Blue", new Deck()),
];

const game = new Game(players);

game.startNewGame();

console.log(game);
