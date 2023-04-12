
// Variables
//
//
let playerScore = 0;
let computerScore = 0;

const choiceButtons = document.querySelectorAll('.choices button');
const playAgainButton = document.querySelector('.play-again-button');
const playerHand =  document.querySelector('.battlefield .player-hand');
const computerHand = document.querySelector('.battlefield .computer-hand');
const hands = document.querySelectorAll('.battlefield img');


// Functions
//
//
function compareHands(playerChoice, computerChoice) {
    let resultArray = [];

    if (playerChoice ===  computerChoice) {
        return "Oh, it's a tie!";
    } else if (playerChoice === 'rock') {
        if (computerChoice === 'scissors'){
            playerScore++;
            return 'You won!';
        } else {
            computerScore++;
            return 'You lost!';
        }
    } else if (playerChoice === 'paper') {
        if (computerChoice === 'rock'){
            playerScore++;
            return 'You won!';
        } else {
            computerScore++;
            return 'You lost';
        }
    } else if (playerChoice === 'scissors') {
        if (computerChoice === 'paper'){
            playerScore++;
            return 'You won!';
        } else {
            computerScore++;
            return 'You lost!';
        }
    }
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateHandsUI(playerChoice, computerChoice) {
    playerHand.src = `images/${playerChoice}.png`;
    computerHand.src = `images/${computerChoice}.png`;
}

function updateMessageUI(newMessage) {
    const message = document.querySelector('.winner-message');
    message.textContent = newMessage;
}

function updateScoreUI(){
    const playerScoreUI = document.querySelector('.score-container .player-score p'); 
    const computerScoreUI = document.querySelector('.score-container .computer-score p');
    playerScoreUI.textContent = playerScore;
    computerScoreUI.textContent = computerScore;
}

function gameOver(){
    // Display the winner of the game
    let newMessage = playerScore > computerScore ? 'You have won the Game!' : 'You lave lost the Game...' 
    updateMessageUI(newMessage);

    // Disable choice buttons
    choiceButtons.forEach(button => {
        button.classList.add('fadeIn');
        button.classList.add('fadeOut');
    });

    // Enable play again button
    const playAgainButton = document.querySelector('.play-again-button');
    playAgainButton.classList.remove('fadeOut');
    playAgainButton.classList.add('fadeIn');
}

function playAgain(){
    // Reset scores
    playerScore = 0;
    computerScore = 0;

    console.log(playerScore);
    console.log(computerScore);

    updateScoreUI();

    // Disable play again button
    const playAgainButton = document.querySelector('.play-again-button');
    playAgainButton.classList.remove('fadeIn');
    playAgainButton.classList.add('fadeOut');

    // Enable choice buttons`
    choiceButtons.forEach(button => {
        button.classList.remove('fadeOut');
        button.classList.add('fadeIn');
    });

    // Update message
    updateMessageUI('Choose an option');
}

function playMatch(event){
    // Start with rock hands
    updateHandsUI('rock', 'rock');

    // Get choices
    let playerChoice = event.target.id;
    let computerChoice = getComputerChoice();

    // Shake hands
    playerHand.style.animation = 'shakePlayerHand 2s ease';
    computerHand.style.animation = 'shakeComputerHand 2s ease';

    // After shaking hands (2 seconds -> 2000 miliseconds)
    setTimeout(() => {
        // Update hands
        updateHandsUI(playerChoice, computerChoice);

        // Play round and display the winner of the round
        let newMessage = compareHands(playerChoice, computerChoice);
        updateMessageUI(newMessage);
        updateScoreUI();

        // Check if it's game over
        if (playerScore === 5 || computerScore === 5){
            gameOver();
        } 
    }, 2000); 
}


// Event Listeners
//
//
choiceButtons.forEach( button => {
    button.addEventListener('click', playMatch);
})

hands.forEach(hand => {
    hand.addEventListener('animationend', (event) => {
        // remove animation
        event.target.style.animation = '';
    });
})

playAgainButton.addEventListener('click', playAgain);

