let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll(".game-button");
const resultDiv = document.getElementById("game-result");
const playerScoreDiv = document.getElementById("player-score-display");
const computerScoreDiv = document.getElementById("computer-score-display");
const resetButton = document.getElementById("restart-button");
const choices = ["rock", "paper", "scissors"];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.id.split('-')[1];
    const computerChoice = getComputerChoice();
    const result = decideWinner(playerChoice, computerChoice);
    updateScore(result);
    displayResult(playerChoice, computerChoice, result);
    animateResult(result);
  });
});

resetButton.addEventListener("click", resetGame);

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function decideWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a draw!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

function updateScore(result) {
  if (result === "You win!") {
    playerScore++;
    playerScoreDiv.textContent = playerScore;
    playerScoreDiv.parentElement.classList.add("winner");
    setTimeout(() => {
      playerScoreDiv.parentElement.classList.remove("winner");
    }, 1000);
  } else if (result === "You lose!") {
    computerScore++;
    computerScoreDiv.textContent = computerScore;
    computerScoreDiv.parentElement.classList.add("winner");
    setTimeout(() => {
      computerScoreDiv.parentElement.classList.remove("winner");
    }, 1000);
  }
}

function displayResult(playerChoice, computerChoice, result) {
  const resultText = `
    <div class="result-text">
      <p>You chose: <strong>${playerChoice}</strong></p>
      <p>Computer chose: <strong>${computerChoice}</strong></p>
      <p class="result-outcome">${result}</p>
    </div>
  `;
  resultDiv.innerHTML = resultText;
}

function animateResult(result) {
  resultDiv.style.animation = "none";
  resultDiv.offsetHeight; 
  resultDiv.style.animation = "pulse 0.5s ease";

  if (result === "You win!") {
    resultDiv.style.color = "#27ae60";
  } else if (result === "You lose!") {
    resultDiv.style.color = "#c0392b";
  } else {
    resultDiv.style.color = "#2c3e50";
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDiv.textContent = "0";
  computerScoreDiv.textContent = "0";
  resultDiv.innerHTML = "Choose your weapon!";
  resultDiv.style.color = "#2c3e50";
}
