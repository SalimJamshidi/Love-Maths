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

// ==================================================
// PART 4: CALCULATE ANSWER — Do the actual math!
// ==================================================

/**
 * Gets the operands (the numbers) and the operator (+, -, x, /)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {

    // Read the FIRST NUMBER from the screen, convert to number
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    // Read the SECOND NUMBER from the screen, convert to number
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    // Read the OPERATOR symbol from the screen (+, -, x, /)
    let operator = document.getElementById("operator").innerText;

    // Do the math based on WHICH operator we see
    if (operator === "+") {
        // Add the numbers, return answer + game type
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        // Multiply the numbers
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        // Subtract second number from first number
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        // Divide first number by second number ✨ NEW
        return [operand1 / operand2, "division"];
    } else {
        // Unknown operator = something went wrong
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

} // End of calculateCorrectAnswer function

// ==================================================
// PART 5: SCORE — Keep track of right and wrong answers
// ==================================================

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    // Read current score from screen
    let oldScore = parseInt(document.getElementById("score").innerText);
    // Add 1 and write new score back to screen
    // ++ BEFORE = increase first, then use the new value
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    // Read current wrong count from screen
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    // Add 1 and write back
    document.getElementById("incorrect").innerText = ++oldScore;
}

// ==================================================
// PART 6: DISPLAY QUESTIONS — Show numbers + symbol on screen
// ==================================================

// Show ADDITION question
function displayAdditionQuestion(operand1, operand2) {
    // Put first number in position 1
    document.getElementById('operand1').textContent = operand1;
    // Put second number in position 2
    document.getElementById('operand2').textContent = operand2;
    // Set operator to plus sign
    document.getElementById('operator').textContent = "+";
}

// Show SUBTRACTION question
function displaySubtractQuestion(operand1, operand2) {
    // Always put the BIGGER number first so we don't get negative answers
    document.getElementById("operand1").textContent = Math.max(operand1, operand2);
    // Always put the SMALLER number second
    document.getElementById("operand2").textContent = Math.min(operand1, operand2);
    // Set operator to minus sign
    document.getElementById("operator").textContent = "-";
}

// Show MULTIPLICATION question
function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

// Show DIVISION question ✨ NEW
function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}