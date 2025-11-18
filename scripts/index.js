// index.js - guarda jugadores en localStorage y navega a game.html
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("start-form");
  const p1Input = document.getElementById("player1_name");
  const p2Input = document.getElementById("player2_name");
  const p1Color = document.getElementById("player1_color");
  const p2Color = document.getElementById("player2_color");
  const notice = document.getElementById("form-notice");

  // Cargar valores previos si existen
  const savedP1 = localStorage.getItem("cf_player1_name");
  const savedP2 = localStorage.getItem("cf_player2_name");
  const savedP1Color = localStorage.getItem("cf_player1_color");
  const savedP2Color = localStorage.getItem("cf_player2_color");

  if (savedP1) p1Input.value = savedP1;
  if (savedP2) p2Input.value = savedP2;
  if (savedP1Color) p1Color.value = savedP1Color;
  if (savedP2Color) p2Color.value = savedP2Color;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    notice.textContent = "";

    const name1 = p1Input.value.trim();
    const name2 = p2Input.value.trim();

    // nombres obligatorios (Opción A)
    if (!name1 || !name2) {
      notice.textContent = "Ambos nombres son obligatorios.";
      if (!name1) p1Input.focus();
      else p2Input.focus();
      return;
    }

    // Si seleccionan el mismo color, lo permitimos (pero recomendable que sean distintos)
    const color1 = p1Color.value;
    const color2 = p2Color.value;

    // Guardar en localStorage
    localStorage.setItem("cf_player1_name", name1);
    localStorage.setItem("cf_player2_name", name2);
    localStorage.setItem("cf_player1_color", color1);
    localStorage.setItem("cf_player2_color", color2);

    // asegurar que existan acumuladores
    if (localStorage.getItem("cf_score1") === null) localStorage.setItem("cf_score1", "0");
    if (localStorage.getItem("cf_score2") === null) localStorage.setItem("cf_score2", "0");

    // navegar a game.html
    window.location.href = "./game.html";
  });
});
