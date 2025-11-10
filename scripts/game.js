var turn, currentPlayer;

var player = [
  { name: "", color: "blue", num: 1 },
  { name: "", color: "red", num: 2 },
];

var board = Array.from({ length: 6 }, () => Array(7).fill(null));

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
