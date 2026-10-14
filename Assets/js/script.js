// ==================================================
// PART 1: SETUP — Start everything when page loads
// ==================================================

// Wait until the HTML page has fully loaded before running our code
document.addEventListener("DOMContentLoaded", function() {

    // Get ALL the <button> elements from the page and store them in a list
    let buttons = document.getElementsByTagName("button");

    // Go through EVERY button one by one...
    for (let button of buttons) {

        // When this button is CLICKED...
        button.addEventListener("click", function() {

            // If the button's data-type is "submit"...
            if (this.getAttribute("data-type") === "submit") {
                // Run the function that checks if answer is correct
                checkAnswer();
            } 
            // Otherwise, it's a game selection button...
            else {
                // Find out which game button was clicked
                let gameType = this.getAttribute("data-type");
                // Start that specific game
                runGame(gameType);
            }
        }); // End of button click listener
    } // End of for loop through buttons

    // Allow pressing ENTER key to submit answer (no need to click button!)
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // When page FIRST loads, start the Addition game automatically
    runGame("addition");

}); // End of DOMContentLoaded

// ==================================================
// PART 2: RUN GAME — Create numbers and show question
// ==================================================

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    // Clear the answer box from previous answer
    document.getElementById("answer-box").value = "";
    // Put cursor inside the answer box ready for typing
    document.getElementById("answer-box").focus();

    // Create TWO RANDOM NUMBERS between 1 and 25
    // Math.random() = 0.000 to 0.999
    // * 25 = 0 to 24.999
    // Math.floor() = round down to whole number (0-24)
    // + 1 = shift range to 1-25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // Based on gameType, show the right question
    if (gameType === "addition") {
        // Show addition question with our 2 numbers
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        // Show multiplication question
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        // Show subtraction question
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        // Show division question ✨ NEW
        displayDivisionQuestion(num1, num2);
    } else {
        // If something weird happens, show error and stop
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
} // End of runGame function

// ==================================================
// PART 3: CHECK ANSWER — Compare user's answer vs correct one
// ==================================================

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    // Get what the user TYPED, turn it from TEXT → NUMBER
    let userAnswer = parseInt(document.getElementById("answer-box").value);

    // Call function to work out what the CORRECT answer is
    let calculatedAnswer = calculateCorrectAnswer();

    // Compare: is user's answer equal to correct answer? true or false
    let isCorrect = userAnswer === calculatedAnswer[0];

    // If answer was RIGHT...
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        // Increase score by 1
        incrementScore();
    } 
    // If answer was WRONG...
    else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        // Increase wrong answer count by 1
        incrementWrongAnswer();
    }

    // Automatically start a NEW question of the SAME game type
    runGame(calculatedAnswer[1]);

} // End of checkAnswer function