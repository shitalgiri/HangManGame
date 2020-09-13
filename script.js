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

let hangManParts = [
  ".tree",
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
  let randomWord;
  const startGame = function () {
    let randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex];
    console.log(randomWord);
    userGuessedRight = [];
    userGuessedWrong = [];

    let blankSpaces = "";
    for (let i = 0; i <= randomWord.length; i++) {
      blankSpaces = blankSpaces.concat("_");
    }
    $("p").text(blankSpaces);
    $("#wrongLetters").text("");
    $("#rightLetters").text("");
    $(".bodyPartImage").hide();

  };
  $('.playAgain').on('click', function(){
    $('input').show();
    $('.playAgain').toggleClass('hidden');
    startGame();

  })
  startGame();
  $("input").on("change", function (event) {
    const userInput = $(this).val();
    let matchedCharacter;
    for (let i = 0; i < randomWord.length; i++) {
      if (userInput === randomWord[i]) {
        matchedCharacter = randomWord[i];
      }
    }
    if (matchedCharacter) {
      userGuessedRight.push(matchedCharacter);
    } else {
      userGuessedWrong.push(userInput);
      $(hangManParts[userGuessedWrong.length - 1]).show();
    }

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
      console.log("You win!");
      $("input").hide();
      $(".playAgain").toggleClass("hidden");
    }
  });
});

// $(function () {
//   let randomWordIndex = Math.floor(Math.random() * words.length);
//   let randomWord = words[randomWordIndex];
//   console.log(randomWord);

//   let dashes = "";
//   for (let i = 0; i < randomWord.length; i++) {
//     dashes = dashes.concat("_");
//   }
//   console.log(dashes);

//   $("p").text(dashes);

//   let rightLettersArray =[];
//   $("input").on("change", function () {
//     let userInput = ($("input").val());
//     for(let i=0; i<randomWord.length; i++){
//       if(userInput === randomWord[i]){
//         rightLettersArray.push(userInput);
//         console.log(rightLettersArray);
//       };
//     }
//   });
// });
