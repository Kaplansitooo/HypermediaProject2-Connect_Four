var turn, currentPlayer, buttons, board;
var player = [
  { name: "Player 1", color: "blue", num: 1 },
  { name: "Player 2", color: "red", num: 2 },
];

class piece {
  constructor(player, color, row, col) {
    this.player = player;
    this.color = color;
    this.row = row;
    this.col = col;
  }
}

class Board {
  constructor(rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  }
  colFull(col) {
    return this.grid[0][col] !== null;
  }
  clear() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }
}

function initGame() {
  const p1name = localStorage.getItem("cf_player1_name") || "Player 1";
  const p2name = localStorage.getItem("cf_player2_name") || "Player 2";
  const p1color = localStorage.getItem("cf_player1_color") || "blue";
  const p2color = localStorage.getItem("cf_player2_color") || "red";

  player[0].name = p1name;
  player[1].name = p2name;
  player[0].color = p1color;
  player[1].color = p2color;

  if (localStorage.getItem("cf_score1") === null) localStorage.setItem("cf_score1", "0");
  if (localStorage.getItem("cf_score2") === null) localStorage.setItem("cf_score2", "0");

  turn = "blue";
  currentPlayer = player[0];
  board = new Board();
  buttons = [];

  initButtons();

  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", restartGame);

  updateTurnIndicator();
  updateScoresUI();
}

function initButtons() {
  for (let col = 0; col < 7; col++) {
    const btn = document.getElementById(`dropPiece${col+1}`);
    if (btn) btn.replaceWith(btn.cloneNode(true));
  }

  buttons = [];
  for (let col = 0; col < 7; col++) {
    const button = document.getElementById(`dropPiece${col + 1}`);
    button.addEventListener("click", () => handleColumnClick(col));
    buttons.push(button);
  }
  toggleButtons(true);
}

function handleColumnClick(col) {
  const dropResult = dropPiece(col);
  if (!dropResult) {
    alert("This column is full. Please choose another one.");
    return;
  }

  const winnerCells = checkWinForPlayer(currentPlayer.num);
  if (winnerCells) {
    highlightWinningCells(winnerCells);
    if (currentPlayer.num === 1) {
      const v = parseInt(localStorage.getItem("cf_score1") || "0", 10) + 1;
      localStorage.setItem("cf_score1", v.toString());
    } else {
      const v = parseInt(localStorage.getItem("cf_score2") || "0", 10) + 1;
      localStorage.setItem("cf_score2", v.toString());
    }

    // guardar ultimo resultado
    localStorage.setItem("cf_last_winner", currentPlayer.name);
    localStorage.setItem("cf_last_winner_index", currentPlayer.num.toString());

    updateScoresUI();
    toggleButtons(false);
    // Mensaje breve y navegar a results
    setTimeout(() => {
      alert(currentPlayer.name + " wins!");
      window.location.href = "./results.html";
    }, 80);
    return;
  }

  // comprobar empate
  if (checkDraw()) {
    localStorage.setItem("cf_last_winner", "draw");
    localStorage.setItem("cf_last_winner_index", "0");
    toggleButtons(false);
    setTimeout(() => {
      alert("It's a draw!");
      window.location.href = "./results.html";
    }, 80);
    return;
  }

  // si no hay ganador ni empate -> cambiar turno
  nextTurn();
  updateTurnIndicator();
}

function dropPiece(col) {
  for (let row = board.rows - 1; row >= 0; row--) {
    if (board.grid[row][col] == null) {
      const newPiece = new piece(currentPlayer.num, currentPlayer.color, row, col);
      board.grid[row][col] = newPiece;

      const cell = document.getElementById(`cell-${col + 1}-${row + 1}`);
      if (cell) {
        const el = createPieceElement(newPiece);
        cell.appendChild(el);
      }

      if (board.colFull(col)) {
        if (buttons[col]) buttons[col].disabled = true;
      }
      return { row: row, col: col };
    }
  }
  if (buttons[col]) buttons[col].disabled = true;
  return null;
}

function createPieceElement(piece) {
  const pieceElement = document.createElement("div");
  pieceElement.classList.add("piece");
  pieceElement.classList.add(piece.color === "blue" ? "color-blue" : "color-red");
  pieceElement.dataset.player = piece.player;
  pieceElement.dataset.row = piece.row;
  pieceElement.dataset.col = piece.col;
  return pieceElement;
}

function checkWinForPlayer(playerNum) {
  return check4row(playerNum) || check4column(playerNum) || check4diagonalUp(playerNum) || check4diagonalDown(playerNum);
}

function check4row(playerNum) {
  for (let r = 0; r < board.rows; r++) {
    let count = 0;
    let cells = [];
    for (let c = 0; c < board.cols; c++) {
      if (board.grid[r][c] && board.grid[r][c].player === playerNum) {
        count++;
        cells.push({ r, c });
        if (count === 4) return cells.slice(-4);
      } else {
        count = 0;
        cells = [];
      }
    }
  }
  return null;
}

function check4column(playerNum) {
  for (let c = 0; c < board.cols; c++) {
    let count = 0;
    let cells = [];
    for (let r = 0; r < board.rows; r++) {
      if (board.grid[r][c] && board.grid[r][c].player === playerNum) {
        count++;
        cells.push({ r, c });
        if (count === 4) return cells.slice(-4);
      } else {
        count = 0;
        cells = [];
      }
    }
  }
  return null;
}

function check4diagonalUp(playerNum) {
  for (let r = 0; r <= board.rows - 4; r++) {
    for (let c = 0; c <= board.cols - 4; c++) {
      let cells = [];
      let count = 0;
      for (let i = 0; i < 4; i++) {
        const rr = r + i;
        const cc = c + i;
        if (board.grid[rr][cc] && board.grid[rr][cc].player === playerNum) {
          count++;
          cells.push({ r: rr, c: cc });
        } else break;
      }
      if (count === 4) return cells;
    }
  }
  return null;
}

function check4diagonalDown(playerNum) {
  for (let r = 3; r < board.rows; r++) {
    for (let c = 0; c <= board.cols - 4; c++) {
      let cells = [];
      let count = 0;
      for (let i = 0; i < 4; i++) {
        const rr = r - i;
        const cc = c + i;
        if (board.grid[rr][cc] && board.grid[rr][cc].player === playerNum) {
          count++;
          cells.push({ r: rr, c: cc });
        } else break;
      }
      if (count === 4) return cells;
    }
  }
  return null;
}

function highlightWinningCells(cells) {
  if (!cells || !cells.length) return;
  for (const pos of cells) {
    const cell = document.getElementById(`cell-${pos.c + 1}-${pos.r + 1}`);
    if (cell && cell.firstElementChild) {
      cell.firstElementChild.classList.add("win");
    }
  }
}

function nextTurn() {
  turn = turn === "blue" ? "red" : "blue";
  currentPlayer = turn === "blue" ? player[0] : player[1];
}

function updateTurnIndicator() {
  const el = document.getElementById("current-turn");
  el.textContent = currentPlayer.name;
  el.style.background = currentPlayer.color === "blue" ? "linear-gradient(180deg,#eaf7ff,#d7eeff)" : "linear-gradient(180deg,#fff2f2,#ffdfdf)";
  for (let col = 0; col < 7; col++) {
    const btn = document.getElementById(`dropPiece${col+1}`);
    if (btn) btn.style.background = currentPlayer.color === "blue" ? "#cceeff" : "#ffbaba";
  }
}

function checkDraw() {
  for (let c = 0; c < board.cols; c++) {
    if (!board.colFull(c)) return false;
  }
  return true;
}

function toggleButtons(enable) {
  buttons.forEach(b => { if (b) b.disabled = !enable; });
}

function updateScoresUI() {
  document.getElementById("score1").textContent = localStorage.getItem("cf_score1") || "0";
  document.getElementById("score2").textContent = localStorage.getItem("cf_score2") || "0";
}

function restartGame() {
  board.clear();
  for (let r = 0; r < board.rows; r++) {
    for (let c = 0; c < board.cols; c++) {
      const cell = document.getElementById(`cell-${c + 1}-${r + 1}`);
      if (cell) cell.innerHTML = "";
    }
  }
  turn = "blue";
  currentPlayer = player[0];
  updateTurnIndicator();
  initButtons();
}

initGame();
