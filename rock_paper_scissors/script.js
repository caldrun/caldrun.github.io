const choiceButtons = document.querySelectorAll('[data-selection]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const playerScoreSpan = document.querySelector('[data-player-score]');
const resultMessage = document.querySelector('.message');

const CHOICES = [
    {
        name: 'rock',
        beats: 'scissors'
    },
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    }
]

//get player choice
choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener('click', e => {
        const choiceName = choiceButton.dataset.selection;
        const playerChoice = CHOICES.find(choice => choice.name === choiceName);
        playMatch(playerChoice);
    });
});

function playMatch(choice) {
    const computerChoice = randomChoice();

    const youWin = getMatchWinner(choice, computerChoice);
    const compWin = getMatchWinner(computerChoice, choice);

    console.log(choice);
    console.log(computerChoice);
    
    //change result message and increment score
    if(youWin) {
        addScore(playerScoreSpan);
        resultMessage.innerText = `You Win! ${choice.name.toUpperCase()} beats ${computerChoice.name.toUpperCase()} `;
    } else if(compWin) {
        addScore(computerScoreSpan);
        resultMessage.innerText = `Computer Wins! ${computerChoice.name.toUpperCase()} beats ${choice.name.toUpperCase()} `;
    } else
    resultMessage.innerText = 'Draw! Neither Wins';

    //when either player reaches 5 points determine game winner
    if(playerScoreSpan.innerText == 5 || computerScoreSpan.innerText == 5) {
        getGameWinner(playerScoreSpan, computerScoreSpan);
    };

};

//generate computer choice
function randomChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
};

//determine match winner
function getMatchWinner(choice, opponentChoice) {
    return choice.beats === opponentChoice.name;
};

//determine game winner
function getGameWinner(pFinal, cFinal) {
    if(pFinal == cFinal) {
        resultMessage.innerText = 'Game Ends in a Draw';
    }
    else if(pFinal > cFinal) {
        resultMessage.innerText = 'Game Over, You Win!';
    }
    else
        resultMessage.innerText = 'Game Over, Computer Wins!';
    
};

//increment score
function addScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
};
