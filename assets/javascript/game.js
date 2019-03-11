//my word bank
var wordBank=["Assist", "Balk", "Ball", "Double", "DoublePlay", "Error", "Flyball", "GrandSlam", "Groundout", "Hit", "HomeRun", "LineDrive", "Loser", "Out", "Save", "Single", "Strikeout", "Triple", "TriplePlay", "Walk", "WalkOff", "Winner"];

//answer Array
var answerArray = [];
  for (var i=0; i<wordBank.length; i++){
    answerArray[i] = "_";
  }

const maxTries = 10;            

var guessedLetters = [];        
var word;                       
var guessingWord = [];          
var remainingGuesses = 0;       
var hasFinished = false;             
var wins = 0; 
var losses = 0;                  

function resetGame() {
    remainingGuesses = maxTries;

    word = Math.floor(Math.random() * (wordBank.length));

    guessedLetters = [];
    guessingWord = [];

    for (var i = 0; i < wordBank[word].length; i++) {
        guessingWord.push("_");
    }   

    document.getElementById("directions-text").style.cssText= "display: hidden";
    updateDisplay();
};


function updateDisplay() {

    document.getElementById("gameWins").innerText = "Wins: " + wins;
    document.getElementById("gameLosses").innerText = "Losses: " + losses;

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    
    document.getElementById("gameWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = "Remaining Guesses: " + remainingGuesses;
    document.getElementById("userGuess").innerText = guessedLetters;
};


function evaluateGuess(letter) {
   var positions = [];
    for (var i = 0; i < wordBank[word].length; i++) {
        if(wordBank[word][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
        
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
    }
};

function checkLoss()
{
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        losses++;
        hasFinished = true;
    }
}


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
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};