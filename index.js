import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const store = new Store(players);
  const view = new View();

  view.bindGameResetEvent((event) => {
    view.closeModal();
    store.reset();
    view.setTurnIndictor(store.game.currentPlayer);
  });

  view.bindNewRoundEvent((event) => {
    console.log("new round event");
    console.log(event);
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === square.id
    );

    if (existingMove) {
      return;
    }

    view.handlePlayerMove(square, store.game.currentPlayer);

    store.playerMove(square.id);

    if (store.game.status.isComplete) {
      let message;
      if (store.game.status.winner) {
        message = `${store.game.status.winner.name} wins!`;
      } else {
        message = "Tie!";
      }
      view.openModal(message);
      return;
    }

    view.setTurnIndictor(store.game.currentPlayer);
  });


}

window.addEventListener("load", init);
