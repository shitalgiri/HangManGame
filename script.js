// •	The game should be able to generate a random word from a array that contains 10 words.

let words = [
  "random",
  "cat",
  "board",
  "encylopedia",
  "buffalo",
  "butter",
  "brand",
  "geology",
  "mobile",
  "computer",
];

// •	Create an array of body parts of the hangman in the order specified. (eg: rope, head, body, left-arm, right-arm, left-leg, right-leg.
let hangManParts = [
  ".rope",
  ".head",
  ".body",
  ".leftArm",
  ".rightArm",
  ".leftLeg",
  ".rightLeg",
];

$(function () {
  let userGuessedRight = [];
  let userGuessedWrong = [];
  // The game should be able to generate a random word from a array that contains 10 words.
  let randomWord;
  const startGame = function () {
    //•	Use Math.random and Math.floor along with the properties of the array so that we can have a random word.
    let randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex];
    userGuessedRight = [];
    userGuessedWrong = [];

    // •	Should display blank for each letter in the word. (for eg: if the word is cat, I will need to display three empty dashes.)
    let blankSpaces = "";
    for (let i = 0; i < randomWord.length; i++) {
      blankSpaces = blankSpaces.concat("_");
    }
    $("p").text(blankSpaces);
    $("#wrongLetters").text("");
    $("#rightLetters").text("");
    $(".bodyPartImage").hide();
    $(".result").hide();
  };
  
  $('.playAgain').on('click', function(){
    $('input').show();
    $('.playAgain').toggleClass('hidden');
    startGame();

  })
  startGame();

  // •	Set a listener ‘on change’ to the input field to evaluate the input field.
  $("input").on("change", function (event) {
    const userInput = $(this).val();
    let matchedCharacter;
  // •	Should be able to check if the letter typed by the user matches the actual letters in the word.
    for (let i = 0; i < randomWord.length; i++) {
      if (userInput === randomWord[i]) {
        matchedCharacter = randomWord[i];
      }
    }
    if (matchedCharacter) {
      userGuessedRight.push(matchedCharacter);
    } else {
      userGuessedWrong.push(userInput);
      // •	If the letters are incorrect, a body part of the hangman should be toggled between hidden class in the image container based on the array order defined below.
      $(hangManParts[userGuessedWrong.length - 1]).show();
    }

    // •	If the letter is correct, that particular letter should be append to their revealed word by using jquery “.concat” method.
    let revealedLetters = "";
    for (let i = 0; i < randomWord.length; i++) {
      let hasFoundThisLetter = userGuessedRight.indexOf(randomWord[i]);
      if (hasFoundThisLetter >= 0) {
        revealedLetters = revealedLetters.concat(randomWord[i]);
      } else {
        revealedLetters = revealedLetters.concat("_");
      }
    }
    $("#wrongLetters").text(userGuessedWrong);
    $("p").text(revealedLetters);

    $("#rightLetters").text(userGuessedRight);
    $("p").text(revealedLetters);
    $(this).val("");
    if (revealedLetters === randomWord) {
      $("input").hide();
      $(".playAgain").toggleClass("hidden");
      $(".win").show();
    }
    // •	If users are not able to guess the word after allowed number of trials, users should be notified that they lost the game.
    if(userGuessedWrong.length === hangManParts.length){
      $("p").text(randomWord); 
      $("input").hide();
      $(".playAgain").toggleClass("hidden");
      $(".lose").show();
    }
  });
});

