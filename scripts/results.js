document.addEventListener("DOMContentLoaded", () => {
  const winnerText = document.getElementById("winner-text");
  const resP1 = document.getElementById("res-player1-name");
  const resP2 = document.getElementById("res-player2-name");
  const resScore1 = document.getElementById("res-score1");
  const resScore2 = document.getElementById("res-score2");
  const playAgainBtn = document.getElementById("play-again");
  const resetBtn = document.getElementById("reset-scores");
  const backMenuBtn = document.getElementById("back-menu");

  const p1name = localStorage.getItem("cf_player1_name") || "Player 1";
  const p2name = localStorage.getItem("cf_player2_name") || "Player 2";
  resP1.textContent = p1name;
  resP2.textContent = p2name;

  const score1 = localStorage.getItem("cf_score1") || "0";
  const score2 = localStorage.getItem("cf_score2") || "0";
  resScore1.textContent = score1;
  resScore2.textContent = score2;

  const lastWinner = localStorage.getItem("cf_last_winner") || null;
  const lastIndex = localStorage.getItem("cf_last_winner_index") || "0";
  if (!lastWinner) {
    winnerText.textContent = "Winner: —";
  } else if (lastWinner === "draw" || lastIndex === "0") {
    winnerText.textContent = "Result: Draw";
  } else {
    winnerText.textContent = "Winner: " + lastWinner;
  }

  playAgainBtn.addEventListener("click", () => {
    window.location.href = "./game.html";
  });

  backMenuBtn.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("¿Deseas reiniciar las puntuaciones acumuladas a 0?")) return;
    localStorage.setItem("cf_score1", "0");
    localStorage.setItem("cf_score2", "0");
    resScore1.textContent = "0";
    resScore2.textContent = "0";
    alert("Puntuaciones reiniciadas.");
  });
});
