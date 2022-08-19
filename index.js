const game = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

document.addEventListener("click", (event) => {
  const target = event.target;
  const isCell = target.classList.contains("cell");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;
    game.xTurn === true ? game.xState.push(cellValue) : game.oState.push(cellValue);
    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "x" : "o");
    game.xTurn = !game.xTurn;
  }
  if (game.xState.length + game.oState.length === 9) {
    handlerGameOver("Berabere!");
  }
  game.winningStates.forEach((state) => {
    if (state.every((cell) => game.xState.includes(cell))) {
      handlerGameOver("X kazandı!");
    } else if (state.every((cell) => game.oState.includes(cell))) {
      handlerGameOver("O kazandı!");
    }
  });
});

document.querySelector(".restart").addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("visible");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });

  game.xTurn = true;
  game.xState.splice(0, game.xState.length);
  game.oState.splice(0, game.oState.length);
});

handlerGameOver = (text) => {
  document.querySelectorAll(".cell").forEach((cell) => cell.classList.add("disabled"));
  document.querySelector(".game-over").classList.add("visible");
  document.querySelector(".game-over-text").textContent = text;
};
