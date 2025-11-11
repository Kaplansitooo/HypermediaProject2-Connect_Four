var turn, currentPlayer, buttons;

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
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }

  colFull(col) {
    return this.grid[grid.rows - 1][col] !== null;
  }
}

function initGame() {
  turn = "blue";
  currentPlayer = player[0];
  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", restartGame);
  var board = new board();
  board.createEmptyGrid();
}

function initButtons() {
  for (let col = 0; col < board.cols; col++) {
    const button = document.getElementById(`dropPiece${col + 1}`);
    button.addEventListener("click", () => handleColumnClick(col));
    buttons.push(button);
  }
}

function handleColumnClick(col) {
  var droped = dropPiece(col);
  droped ? nextTurn() : columnFullAlert();
}

columnFullAlert = () => {
  alert("This column is full. Please choose another one.");
};

function dropPiece(col) {
  for (let row = 0; row <= board.rows; row++) {
    if (board.grid[row][col] == null && board.colFull(col) === false) {
      const newPiece = new piece(
        currentPlayer.num,
        currentPlayer.color,
        row,
        col
      );
      board.grid[row][col] = newPiece;
      console.log("Dropped piece at row " + row + ", col " + col);
      if (board.colFull(col)) {
        console.log("Column " + col + " is now full.");
      }
      var cellCol = document.getElementById(`col-${col}`);
      var cell = cellCol.querySelector('[name="row' + row + '"]');
      cell.insertAdjacentElement("afterbegin", createPieceElement(newPiece));
      return true;
    } else {
      console.log("No more space in this column" + col);
      buttons[col].disabled = true;
      return false;
    }
  }
}

function createPieceElement(piece) {
  const pieceElement = document.createElement("div");
  pieceElement.classList.add("piece");
  pieceElement.style.backgroundColor = piece.color;
  return pieceElement;
}

function checkWin() {
  return (
    check4row() || check4column() || check4diagonalUp() || check4diagonalDown()
  );
}

function check4row() {
  for (let r = 0; r < board.rows; r++) {
    let count = 0;
    for (let c = 0; c < board.cols; c++) {
      if (board.grid[r][c] && board.grid[r][c].player === currentPlayer.num) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }
  return false;
}

function check4column() {
  for (let r = 0; r < board.cols; r++) {
    let count = 0;
    for (let c = 0; c < board.rows; c++) {
      if (board.grid[r][c] && board.grid[r][c].player === currentPlayer.num) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }
  return false;
}

function check4diagonalUp() {
  for (let col = 0; col < board.cols - 3; col++) {
    for (let row = 0; row < board.rows - 3; row++) {
      let count;
      for (let i = 0; i < 4; i++) {
        if (
          board.grid[row + i][col + i] &&
          board.grid[row + i][col + i].player === currentPlayer.num
        ) {
          count++;
        }
      }
      if (count === 4) {
        return true;
      }
    }
  }
  return false;
}

function check4diagonalDown() {
  for (let col = 0; col < board.cols - 3; col++) {
    for (let row = 3; row < board.rows; row++) {
      let count = 0;
      for (let i = 0; i < 4; i++) {
        if (
          board.grid[row - i][col + i] &&
          board.grid[row - i][col + i].player === currentPlayer.num
        ) {
          count++;
        }
      }
      if (count === 4) {
        return true;
      }
    }
  }
  return false;
}

function nextTurn() {
  turn = turn === "blue" ? "red" : "blue";
  currentPlayer = turn === "blue" ? player[0] : player[1];
}

function checkDraw() {
  for (let col = 0; col < board.cols - 3; col++) {
    for (let row = 0; row < board.rows - 3; row++) {
      if (board.grid[row][col] == null) {
        return false;
      }
    }
  }
}
function restartGame() {
  board.grid = board.createEmptyGrid();
  turn = "blue";
  currentPlayer = player[0];
  alert("Game restarted!");
}
