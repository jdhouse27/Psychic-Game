//word Bank
var wordBank=["Assist", "Balk", "Ball", "Double", "Double Play", "Error", "Flyball", "Grand Slam", "Groundout", "Hit", "Home Run", "Line Drive", "Loser", "Out", "Save", "Single", "Strikeout", "Triple", "Triple Play", "Walk", "Walk Off", "Winner"];

//Game sounds
var rightGuessSound = new Audio('./assets/images/hit.wav');
var wrongGuessSound = new Audio('./assets/images/strike.wav');
var winSound = new Audio('./assets/images/cheer.wav');
var loseSound = new Audio('./assets/images/Out.wav');

const maxTries = 6;            // Maximum number of tries player has

var guessedLetters = [];        
var currentWord;                // Index of the current word in the array
var remainingGuesses = 0;       
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up
var losses = 0;                  

// Reset
function resetGame() {
    remainingGuesses = maxTries;

    currentWord = Math.floor(Math.random() * (wordBank.length));

    guessedLetters = [];
    gameWord = [];

    // Build the game word
    for (var i = 0; i < currentWord.length; i++) {
        gameWord.push("_");
    }   

    // Hide Press any key to star playing text
    directionsText.textContent = "";

    updateDisplay();
};

function updateDisplay() {

    document.getElementById("gameWins").innerText = wins;

    var gameWordText = "_";
    for (var i = 0; i < gameWord.length; i++) {
        gameWordText += gameWord[i];
        if (currentWord[i] === " "){
            gameWord.push(" ");
         space = 1;   
        } else{
            gameWord.push("_");
        }
    }

    document.getElementById("gameWord").innerText = gameWordText;
    document.getElementById("guessesLeft").innerText = remainingGuesses;
    document.getElementById("userGuess").innerText = guessedLetters;
};

function evaluateGuess(letter) {
    
    var positions = [];

    for (var i = 0; i < wordBank[currentWord].length; i++) {
        if(wordBank[currentWord][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess & play sound
    if (positions.length <= 0) {
        remainingGuesses--;
        wrongGuessSound.play();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            gameWord[positions[i]] = letter;
            rightGuessSound.play();
        }
    }

// Checks for win
    if(gameWord[positions[i]] === -1) {
        gameStatus.innerHTML = "Great! You Win!";
        wins++;
        winSound.play();
        hasFinished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        loseSound.play();
        gameStatus.innerHTML = "Game Over! You Lose!";
        hasFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


document.onkeydown = function(event) {
   
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
     
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            updateDisplay();
            checkWin();
            checkLoss();
            makeGuess();
        }
    }
  };
};
