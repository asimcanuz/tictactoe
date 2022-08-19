import { Game } from "./game.js";

const game = new Game();

const gameStartButton = document.querySelector("#game-start");
const radioButtons = document.querySelectorAll("input[type=radio]");

radioButtons.forEach((radio) => {
  radio.addEventListener("click", ({ target }) => {
    if (target.value === "player-vs-player") {
      game.setGameType(1);
    } else {
      game.setGameType(2);
    }
  });
});

gameStartButton.addEventListener("click", () => {
  game.start();
  if (game.getGameType() === 1) {
    playerVplayer();
  } else {
    playerVcomputer();
  }
});
document.querySelector(".restart").addEventListener("click", () => {
  game.restart();
});

function playerVplayer() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    const isCell = target.classList.contains("cell");
    const isDisabled = target.classList.contains("disabled");

    if (isCell && !isDisabled) {
      game.getCurrentPlayer() === "X" ? game.drawX(target) : game.drawO(target);
      game.checkWin();
      game.checkDraw();
    }
  });
}
function playerVcomputer() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    const isCell = target.classList.contains("cell");
    const isDisabled = target.classList.contains("disabled");

    if (isCell && !isDisabled) {
      game.drawX(target);
      game.checkWin();
      game.checkDraw();
      if (!game.getWinOrDraw()) {
        game.computerMove();
      }
    }
  });
}
