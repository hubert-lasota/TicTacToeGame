"use strict";
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
  const store = new Store("live-storage", players);
  const view = new View();

  function initView() {
    view.closeAll();
    view.clearMoves();
    view.setTurnIndictor(store.game.currentPlayer);
    view.updateScoreboard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties
    );
    view.initializeMoves(store.game.currentGameMoves);
  }

  initView();

  window.addEventListener("storage", () => {
    initView();
  });
  
  view.bindGameResetEvent((event) => {
    store.reset();
    initView();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    initView();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.currentGameMoves.find(
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
