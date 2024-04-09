const App = {
  $: {
    menu: document.querySelector("#menu"),
    menuItems: document.querySelector("#menu-items"),
    resetBtn: document.querySelector("#reset-btn"),
    newRoundBtn: document.querySelector("#new-round-btn"),
    squares: document.querySelectorAll(
      "#square-1, #square-2, #square-3, #square-4, #square-5, #square-6, #square-7, #square-8, #square-9"
    ),
    modal: document.querySelector("#modal"),
    modalText: document.querySelector("#modal-text"),
    modalBtn: document.querySelector("#modal-btn"),
    turn: document.querySelector("#turn"),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => move.squareId);

    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;
    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) {
        winner = 1;
      } else if (p2Wins) {
        winner = 2;
      }
    });
    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress",
      winner, // 1 | 2 | null - represents a tie
    };
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("reset the game");
    });

    App.$.newRoundBtn.addEventListener("click", (event) => {});

    App.$.modalBtn.addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.modal.classList.add("hidden");
      App.$.turn.replaceChildren();
      const player1TurnIcon = document.createElement("i");
      player1TurnIcon.classList.add("fa-solid", "fa-x", "turquoise");
      const turnTextParagraph = document.createElement("p");
      turnTextParagraph.textContent = "Player 1, you're up"
      turnTextParagraph.classList.add("turquoise");
      App.$.turn.appendChild(player1TurnIcon);
      App.$.turn.appendChild(turnTextParagraph);
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === parseInt(squareId[squareId.length - 1])
          );
          return existingMove !== undefined;
        };

        const lastCharInSquareId = square.id[square.id.length - 1];
        const squareIdConvertedIntoNumber = parseInt(lastCharInSquareId);
        if (hasMove(square.id)) {
          return;
        }

        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);

        const icon = document.createElement("i");

        const nextPlayer = getOppositePlayer(currentPlayer);
        App.$.turn.replaceChildren();
        const player1TurnIcon = document.createElement("i");
        player1TurnIcon.classList.add("fa-solid", "fa-x", "turquoise");

        const player2TurnIcon = document.createElement("i");
        player2TurnIcon.classList.add("fa-solid", "fa-o", "yellow");

        const turnTextNode = document.createTextNode(
          `Player ${nextPlayer}, you're up`
        );
        const turnTextParagraph = document.createElement("p");
        turnTextParagraph.appendChild(turnTextNode);
        if (nextPlayer === 1) {
          App.$.turn.appendChild(player1TurnIcon);
          turnTextParagraph.classList.add("turquoise");
        } else {
          App.$.turn.appendChild(player2TurnIcon);
          turnTextParagraph.classList.add("yellow");
        }
        App.$.turn.appendChild(turnTextParagraph);
        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "turquoise");
        } else {
          icon.classList.add("fa-solid", "fa-o", "yellow");
        }

        App.state.moves.push({
          squareId: squareIdConvertedIntoNumber,
          playerId: currentPlayer,
        });

        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        square.replaceChildren(icon);

        const game = App.getGameStatus(App.state.moves);

        if (game.status === "complete") {
          App.$.modal.classList.remove("hidden");

          let message = "";
          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = `Tie game!`;
          }
          App.$.modalText.textContent = message;
        }
      });
    });
  },
};
/* Skonczylem na 2:57*/
window.addEventListener("load", App.init);
