var turn, currentPlayer;

var player = [
  { name: "", color: "blue", num: 1 },
  { name: "", color: "red", num: 2 },
];

class piece {
    constructor(player, color, row, col) {
    this.player = player;
    this.color = color;
    this.row = row;
    this.col = col;
  }
}

class board {
    constructor(rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  }

  createEmptyGrid() {
    return Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(null)
    );
  }
}

function initGame() {
  turn = "X";
  currentPlayer = player[0];
  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", restartGame);
}

function handleColumnClick(col) {}

function dropPiece(col) {}

function checkWin() {}

function nextTurn() {}

function checkDraw() {}

function restartGame() {}
