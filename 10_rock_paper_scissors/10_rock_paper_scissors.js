const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
  };

  let yourMove = '';
  let computerMove = '';
  let result = '';

  // updateScore();

  function play(move) {
    yourMove = move;
    const randNum = Math.random();

    if (randNum < 1/3) {
      computerMove = 'rock';
    } else if (randNum < 2/3) {
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
      `You picked: <img src="../../images/${yourMove}.png"> Computer picked: <img src="../../images/${computerMove}.png">`;
  }