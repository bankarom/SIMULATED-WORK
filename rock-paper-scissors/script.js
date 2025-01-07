let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('#rock, #paper, #scissors');
const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const resetButton = document.getElementById('reset');
const choices = ['rock', 'paper', 'scissors'];


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.id;
    const computerChoice = getComputerChoice();
    const result = decideWinner(playerChoice, computerChoice);
    updateScore(result);
    displayResult(playerChoice, computerChoice, result);
  });
});


resetButton.addEventListener('click', resetGame);


function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}


function updateScore(result) {
  if (result === "You win!") {
    playerScore++;
  } else if (result === "You lose!") {
    computerScore++;
  }
  scoreDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}


function displayResult(playerChoice, computerChoice, result) {
  resultDiv.innerHTML = `
    You chose: <strong>${playerChoice}</strong><br>
    Computer chose: <strong>${computerChoice}</strong><br>
    Result: <strong>${result}</strong>
  `;
}


function resetGame() {
  playerScore = 0;
  computerScore = 0;
  scoreDiv.textContent = `Player: 0 | Computer: 0`;
  resultDiv.textContent = 'Choose an option to start!';
}
