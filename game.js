export class Game {
  //properties
  xTurn = true;
  xState = [];
  oState = [];
  winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  gameTableState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  gameType = 1;
  winOrDraw = false;

  //methods

  initGame() {
    //initialize the game
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("disabled", "x", "o");
    });
    this.xTurn = true;
    this.xState = [];
    this.oState = [];
    this.gameTableState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.winOrDraw = false;
  }

  start() {
    this.initGame();
  }
  getGameType() {
    return this.gameType;
  }
  setGameType(type) {
    //set the game type
    this.gameType = type;
  }

  getCurrentPlayer() {
    return this.xTurn ? "X" : "O";
  }
  setCurrentPlayer() {
    this.xTurn = !this.xTurn;
  }

  drawX(cell) {
    //draw an x in the cell
    const cellValue = cell.dataset.value;
    this.xState.push(Number(cellValue));
    cell.classList.add("disabled");
    cell.classList.add("x");
    this.setCurrentPlayer();
  }
  drawO(cell) {
    //draw an o in the cell
    const cellValue = cell.dataset.value;
    this.oState.push(Number(cellValue));
    cell.classList.add("disabled");
    cell.classList.add("o");
    this.setCurrentPlayer();
  }
  computerMove() {
    //computer move
    const emptyCells = this.gameTableState.filter((cell) => {
      return !this.xState.includes(cell) && !this.oState.includes(cell);
    });
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = document.querySelector(`[data-value="${randomCell}"]`);
    this.drawO(cell);
    this.checkWin();
    this.checkDraw();
  }

  restart() {
    //restart the game
    document.querySelector(".game-over").classList.remove("visible");
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("disabled", "x", "o");
    });

    this.xTurn = true;
    this.xState.splice(0, this.xState.length);
    this.oState.splice(0, this.oState.length);
    this.winOrDraw = false;
  }

  drawGameOver(message) {
    //draw the game over message
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.classList.add("disabled"));
    document.querySelector(".game-over").classList.add("visible");
    document.querySelector(".game-over-text").textContent = message;
  }
  checkWin() {
    //check if there is a win

    this.winningStates.forEach((state) => {
      if (state.every((cell) => this.xState.includes(cell))) {
        this.drawGameOver("X kazandı!");
        this.setWinOrDraw();
      } else if (state.every((cell) => this.oState.includes(cell))) {
        this.drawGameOver("O kazandı!");
        this.setWinOrDraw();
      }
    });
  }

  checkDraw() {
    //check if there is a draw
    if (this.xState.length + this.oState.length === 9) {
      this.drawGameOver("Berabere!");
    }
  }
  getWinOrDraw() {
    return this.winOrDraw;
  }
  setWinOrDraw() {
    this.winOrDraw = true;
  }
}
