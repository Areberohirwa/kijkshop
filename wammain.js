let playerNameInput = prompt('Enter your name');
const playerName = document.querySelector('.player-name');
const mole = document.querySelector('.mole');
const messageBox = document.querySelector('.message-credits');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const attempts = document.querySelector('.attempts');
const rounds = document.querySelector('.rounds');
const missedHits = document.querySelector('.missed-hits');
const startBtn = document.querySelector('#start-btn');
const containerEl = document.querySelector('.container');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let attempt = 0;
let missed = 0;
let round = 0;

 while (playerNameInput.length > 11) {
  alert('de naam is te lang')
  playerNameInput = prompt('typ in de juiste naam')

  playerName.innerHTML = playerNameInput

  if (playerNameInput == 'quit') {
    alert('ok, u bent anonymous')
    playerName.innerHTML = '<h2>' +'Player 1'+ '</h2>';

    break;
  }
} 
while (playerNameInput.length < 2) {
  alert('de naam is te kort')
  playerNameInput = prompt('typ in de juiste naam')

  playerName.innerHTML = playerNameInput

  if (playerNameInput == 'quit') {
    alert('ok, u bent anonymous')
    playerName.innerHTML = '<h2>' +'Player 1'+ '</h2>';

    break;
  }
}

playerName.innerHTML = playerNameInput

startBtn.addEventListener('click', function () {
  currentTime = 60;
  result = 0;
  attempt = 0;
  missed = 0;
  attempts.innerHTML = attempt;
  missedHits.innerHTML = missed;
  rounds.innerHTML = round;
  score.innerHTML = result;

  let countDownTimerId = setInterval(countDown, 1000);
  let duration = setInterval(moveMole, 1000);

  makeGrid('grid');

});

function countDown() {
  currentTime--;
  timeLeft.innerHTML = currentTime;

  if (currentTime == 0) {
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
    currentTime = 60;
    messageBox.innerHTML = '<h4>' + '' + '</h4>'
  }
}

function makeGrid(level) {
  containerEl.innerHTML = '';

  let cells;
  
  if (level == 'grid') {
    cells = 9;
  } else if (level == 'grid-large') {
    cells = 16;
  } else if (level == 'grid-larger') {
    cells = 25;
  } else if (level == 'grid-largest') {
    cells = 36;
  }
  

  let newDivCell = document.createElement('div');
  newDivCell.classList.add(level);

  for (let index = 0; index < cells; index++) {
    let newMoleCell = document.createElement('div');
    newMoleCell.classList.add('square');
    newMoleCell.id = index.toString();
    newMoleCell.addEventListener('click', function () {
      attempt++;
      attempts.innerHTML = attempt;
      
      newDivCell.querySelectorAll('.square').forEach((square) => {
        square.classList.remove('mole');
      });
      
      newMoleCell.classList.add('mole');
      
      if (result <= 0 || result < 5) {
        level = 'grid';
        makeGrid('grid')
      } else if (result >= 5 && result < 8) {
        level = 'grid-large';
        makeGrid('grid-large');
        messageBox.classList.add('animation');
        messageBox.innerHTML = '<h4>' + 'Level up' + '</h4>'
      } else if (result >= 8 && result < 10) {
        level = 'grid-larger';
        makeGrid('grid-larger')
        messageBox.classList.add('animation');
        messageBox.innerHTML = '<h4>' + 'Level up' + '</h4>'
      } else if (result >= 10 && result == 15) {
        level = 'grid-largest';
        makeGrid('grid-largest')
        messageBox.classList.add('animation');
        messageBox.innerHTML = '<h4>' + 'Level up' + '</h4>'
      }
      
      if (newMoleCell.id === hitPosition) {
        messageBox.classList.add('animation')
        result++;
        messageBox.innerHTML = '<h4>' + '+1 point' + '</h4>'
        hitPosition = null;
      } else {
        messageBox.classList.add('animation')
        messageBox.innerHTML = '<h4>' + '-1 point' + '</h4>'
        result--;
        missed++;
        missedHits.innerHTML = missed;
      }

      if (result === 15) {
        result = 0;
        currentTime = 60;
        round++;
        rounds.innerHTML = round;
        messageBox.classList.add('animation')
        messageBox.innerHTML = '<h4>' + '' + '</h4>'
        alert('Game over! You won!');
      }

      score.innerHTML = result;
    });

    newDivCell.appendChild(newMoleCell);
  }

  containerEl.appendChild(newDivCell);
}

function moveMole() {
  let squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id;
}