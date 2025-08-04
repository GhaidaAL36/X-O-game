const XMark = "x";
const OMark = "o";
let oTurn;
const cellElements = document.querySelectorAll("[data-cell]");
const container = document.getElementById("container");
const resultBox = document.getElementById("result-msg-box");
const resultMsg = document.querySelector("#result-msg p");
const restartBtn = document.getElementById("restart-btn");

const winning_place = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  oTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(XMark);
    cell.classList.remove(OMark);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setMarksHoverClass();

  resultBox.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentMark = oTurn ? OMark : XMark;

  placeMark(cell, currentMark);

  if (checkWin(currentMark)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    sawpTurns();
    setMarksHoverClass();
  }
}

function placeMark(cell, currentMark) {
  cell.classList.add(currentMark);
}

function sawpTurns() {
  oTurn = !oTurn;
}

function setMarksHoverClass() {
  container.classList.remove(XMark);
  container.classList.remove(OMark);

  if (oTurn) {
    container.classList.add(OMark);
  } else {
    container.classList.add(XMark);
  }
}

function checkWin(currentMark) {
  return winning_place.some((win) => {
    return win.every((index) => {
      return cellElements[index].classList.contains(currentMark);
    });
  });
}

function endGame(draw) {
  if (draw) {
    resultMsg.innerText = "Draw!";
  } else {
    resultMsg.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
  }

  resultBox.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(XMark) || cell.classList.contains(OMark);
  });
}

restartBtn.addEventListener("click", startGame);
