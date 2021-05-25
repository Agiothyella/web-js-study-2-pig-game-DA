'use strict';

const score0E = document.querySelector('#score--0');
const score1E = document.querySelector('#score--1');
const current0E = document.querySelector('#current--0');
const current1E = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0E = document.querySelector('.player--0');
const player1E = document.querySelector('.player--1');
const diceE = document.querySelector('.dice');

let scores, activePlayer, currentScore, playing;

function init() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  diceE.classList.add('hidden');
  score0E.textContent = scores[0];
  score1E.textContent = scores[1];
  current0E.textContent = currentScore;
  current1E.textContent = currentScore;
  player0E.classList.add('player--active');
  player1E.classList.remove('player--active');
  player0E.classList.remove('player--winner');
  player1E.classList.remove('player--winner');
}

init();

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E.classList.toggle('player--active');
  player1E.classList.toggle('player--active');
}

// New Game
btnNew.addEventListener('click', function () {
  init();
});

// Roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceE.classList.remove('hidden');
    diceE.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceE.classList.add('hidden');
      btnRoll.removeEventListener('click');
      btnHold.removeEventListener('click');
    }
    switchPlayer();
  }
});
