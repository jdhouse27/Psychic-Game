//word Bank
var wordBank=["Assist", "Balk", "Ball", "Double", "Error", "Flyball", "Groundout", "Hit", "Loser", "Out", "Save", "Single", "Strikeout", "Triple",  "Walk", "Winner"];
// "Double Play", "Grand Slam", "Home Run", "Line Drive", "Triple Play", "Walk Off",
//Game sounds
var rightGuessSound = new Audio('./assets/images/hit.wav');
var wrongGuessSound = new Audio('./assets/images/strike.wav');
var winSound = new Audio('./assets/images/cheer.wav');
var loseSound = new Audio('./assets/images/Out.wav');

var currentWord = "";            // Index of the current word in the array
var lettersInWord = [];
var numBlanks = 0;
var blanksAndCorrect = [];
var wrongGuesses = [];

var remainingGuesses = 0;        
var wins = 0;                   
var losses = 0;                  

function reset() {
    document.getElementById("reset").onmouseup = function(){
      document.getElementById("directions-text").innerHTML = "Good Luck!";
      wrongGuesses = [];
      startGame();
    }
}

// Start Garm
function startGame() {
    //set total number of guesses
    remainingGuesses = 9;
    //randomly select word from word bank
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLocaleLowerCase();
    //divide word into individual letters
    lettersInWord = currentWord.split("");
    //add a blank space for each letter 
    numBlanks = lettersInWord.length;
    //make sure we have a word
    //console.log (currentWord);

    blanksAndCorrect = [];
    wrongGusses = [];

    for (var i = 0; i < numBlanks; i++){
        blanksAndCorrect.push("_");
    }

    // document.getElementById("directions-text").innerHTML = "";
    document.getElementById("reset").style.display = "none";
    document.getElementById("guessesLeft").innerText = "Guesses: " + remainingGuesses;
    document.getElementById("gameWord").innerHTML = blanksAndCorrect.join(" ");
    document.getElementById("userGuess").innerText = wrongGuesses.join(" ");
};

function evaluateGuess(letter) {
  // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
  var letterInWord = false;
  document.getElementById("directions-text").innerHTML = " ";
  // Check if a letter exists inside the array at all.
  for (var i = 0; i < numBlanks; i++) {
    if (currentWord[i] === letter) {
      // If the letter exists then toggle this boolean to true. This will be used in the next step.
      letterInWord = true;
    }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices).
  if (letterInWord) {

    // Loop through the word.
    for (var j = 0; j < numBlanks; j++) {

      // Populate the blanksAndSuccesses with every instance of the letter.
      if (currentWord[j] === letter) {
        // Here we set the specific space in blanks and letter equal to the letter when there is a match.
        blanksAndCorrect[j] = letter;
        rightGuessSound.play();
      }
    }
  }
  // If the letter doesn't exist at all...
  else {
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    wrongGuesses.push(letter);
    remainingGuesses--;
    wrongGuessSound.play();
  }
};

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {

    // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + wins + " | LossCount: " + losses + " | NumGuesses: " + remainingGuesses);
  
    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    document.getElementById("guessesLeft").innerHTML = "Guesses: " + remainingGuesses;
    // This will print the array of guesses and blanks onto the page.
    document.getElementById("gameWord").innerHTML = blanksAndCorrect.join(" ");
    // This will print the wrong guesses onto the page.
    document.getElementById("userGuess").innerHTML = wrongGuesses.join(" ");
  
    // If we have gotten all the letters to match the solution...
    if (lettersInWord.toString() === blanksAndCorrect.toString()) {
      // ..add to the win counter & give the user an alert.
      wins++;
      document.getElementById("directions-text").innerHTML = "Yeah! You Won";
      winSound.play();
      // Update the win counter in the HTML & restart the game.
      document.getElementById("gameWins").innerHTML = "Wins: " + wins;
      document.getElementById("reset").style.display = "block";
    
      reset();
    }
  
    // If we've run out of guesses..
    else if (remainingGuesses === 0) {
      // Add to the loss counter.
      losses++;
      // Give the user an alert.
      document.getElementById("directions-text").innerHTML = "You Lost! Play Again";
      loseSound.play();
      // Update the loss counter in the HTML.
      document.getElementById("gameLosses").innerHTML = "Losses:  " + losses;
      document.getElementById("reset").style.display = "block";
      // Restart the game.
      reset();
    }
  
  }
  

  startGame();
  
  // Then initiate the function for capturing key clicks.
  document.onkeyup = function(event) {
    // Check if the key pressed is a letter.
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      // Converts all key clicks to lowercase letters.
      var letterGuessed = event.key.toLowerCase();
      // Runs the code to check for correctness.
      evaluateGuess(letterGuessed);
      // Runs the code after each round is done.
      roundComplete();
    }
  };
  
