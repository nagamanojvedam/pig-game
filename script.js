"use strict";

const newGameButton = document.querySelector(".new-game");
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");

const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");

const player0Score = document.getElementById("score-0");
const player1Score = document.getElementById("score-1");

const current0Score = document.getElementById("current-0");
const current1Score = document.getElementById("current-1");

const diceEl = document.querySelector(".dice");

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

const setGame = () => {
  document.querySelector(`.player-${activePlayer}`).classList.remove("winner");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");

  diceEl.classList.add("hidden");

  player0Score.textContent = 0;
  player1Score.textContent = 0;

  current0Score.textContent = 0;
  current1Score.textContent = 0;
};

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

const checkWinner = () => {
  if (scores[activePlayer] >= 100) {
    currentScore = 0;
    playing = false;
    document.querySelector(`.player-${activePlayer}`).classList.add("winner");
  }
};

rollDiceButton.addEventListener("click", () => {
  if (playing) {
    const rolledDice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./images/dice-${rolledDice}.png`;
    diceEl.classList.remove("hidden");

    currentScore += rolledDice;
    document.querySelector(`#current-${activePlayer}`).textContent =
      currentScore;

    if (rolledDice === 1) switchPlayer();
  }
});

holdButton.addEventListener("click", () => {
  scores[activePlayer] += currentScore;

  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  checkWinner();
  if (playing) switchPlayer();
});

newGameButton.addEventListener("click", () => {
  setGame();
});

setGame();
