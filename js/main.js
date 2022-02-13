import Game from "./modules/game.js";
import Player from "./modules/player.js";
import Deck from "./modules/deck.js";
import constants from "./constants.js";

const playerNames = ["Travis", "Kimmo"];

const init = async () => {
  const promises = playerNames.map(async (playerName, index) => {
    //Create deck
    const deck_id = await newDeck(1);

    const deck = new Deck(1, deck_id);

    return new Player(index + 1, playerName, constants.MARBLE_COLORS[index], deck);
  });

  const players = await Promise.all(promises);

  const game = new Game(players);

  await game.startNewGame();

  console.log(game);
};

const newDeck = async (numberOfDecks) => {
  const response = await fetch(
    `${constants.DECK_OF_CARDS_API}new/shuffle/?deck_count=${numberOfDecks}&jokers_enabled=true`
  );

  if (response.status >= 200 && response.status <= 299) {
    const data = await response.json();
    return data.deck_id;
  }
};

init();
