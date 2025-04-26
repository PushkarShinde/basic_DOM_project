const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

let yourMove = '';
let computerMove = '';
let result = '';
let firstMovePlayed = false;

updateScore();
instructionBox();

function play(move) {
  if (!firstMovePlayed) {
    firstMovePlayed = true;
    collapseInstructions();
  }

  yourMove = move;
  const randNum = Math.random();

  if (randNum < 1 / 3) {
    computerMove = 'rock';
  } else if (randNum < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  if (computerMove === yourMove) {
    result = 'tied';
    score.ties++;
  } else if (
    (yourMove === 'rock' && computerMove === 'scissors') ||
    (yourMove === 'paper' && computerMove === 'rock') ||
    (yourMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'won';
    score.wins++;
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  } else {
    result = 'lose';
    score.loses++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
  updateStatus();
  updateMoves();
}

function updateScore() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function updateStatus() {
  document.querySelector('.js-status').innerHTML = `You ${result}!`;
}

function updateMoves() {
  document.querySelector('.js-moves').innerHTML =
    `You picked: <img src="../images/${yourMove}.png"> Computer picked: <img src="../images/${computerMove}.png">`;
}

function instructionBox() {
  document.querySelector('.js-instructions').innerHTML = `
    <p><strong>Rules:</strong>
      <br>1. Click to start playing.
      <br>2. Enjoy and laugh.
      <br>3. Don't forget the second rule! ✌️
    </p>`;
}

function collapseInstructions() {
  const instructionsContainer = document.querySelector('.js-instructions');
  instructionsContainer.innerHTML = `
    <button class="instruction-button" onclick="showInstructions()">Show Instructions</button>
  `;
}

function showInstructions() {
  const instructionsContainer = document.querySelector('.js-instructions');
  instructionsContainer.innerHTML = `
    <p><strong>Rules:</strong>
      <br>1. Click to start playing.
      <br>2. Enjoy and laugh.
      <br>3. Don't forget the second rule! ✌️
    </p>
    <button class="instruction-button" onclick="collapseInstructions()">Hide Instructions</button>
  `;
}

function resetScore() {
  const scoreboard = document.querySelector('.scoreboard');
  scoreboard.classList.add('shake');

  setTimeout(() => {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();

    scoreboard.classList.remove('shake');
  }, 500); // Shake duration = 0.5s
}
