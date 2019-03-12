//word Bank
var wordBank=["Assist", "Balk", "Ball", "Double", "Double Play", "Error", "Flyball", "Grand Slam", "Groundout", "Hit", "Home Run", "Line Drive", "Loser", "Out", "Save", "Single", "Strikeout", "Triple", "Triple Play", "Walk", "Walk Off", "Winner"];

//Game sounds
var rightGuessSound = new Audio('./assets/images/hit.wav');
var wrongGuessSound = new Audio('./assets/images/strike.wav');
var winSound = new Audio('./assets/images/cheer.wav');
var loseSound = new Audio('./assets/images/Out.wav');

const maxTries = 10;            // Maximum number of tries player has

var guessedLetters = [];        // Stores the letters the user guessed
var currentWord;                // Index of the current word in the array
var remainingGuesses = 0;       // How many tries the player has left
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0; 
var losses = 0;                  // How many wins has the player racked up

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWord = Math.floor(Math.random() * (wordBank.length));

    // Clear out arrays
    guessedLetters = [];
    gameWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < currentWord.length; i++) {
        gameWord.push("_");
    }   

    // Hide game over and win images/text
    directionsText.textContent = "";
        
    // Show display
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("gameWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "_";
    for (var i = 0; i < gameWord.length; i++) {
        guessingWordText += gameWord[i];
        if (currentWord[i] === " "){
            gameWord.push(" ");
         space = 1;   
        } else{
            gameWord.push("_");
        }
    }

    //
    document.getElementById("gameWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = remainingGuesses;
    document.getElementById("userGuess").innerText = guessedLetters;
};


// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < wordBank[currentWord].length; i++) {
        if(wordBank[currentWord][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess
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

// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
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
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            updateDisplay();
            checkWin();
            checkLoss();
            makeGuess();
        }
    }
  };
};
