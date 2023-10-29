const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      isGameActive = false;
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      message.textContent = `Player ${currentPlayer} wins!`;
    }
  }
  if ([...cells].every((cell) => cell.textContent)) {
    isGameActive = false;
    message.textContent = "It's a draw!";
  }
};

const handleCellClick = (e) => {
  const cell = e.target;
  if (!isGameActive || cell.textContent) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
  checkWin();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
};

const restartGame = () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winner");
  });
  currentPlayer = "X";
  isGameActive = true;
  message.textContent = "Player X's turn";
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
