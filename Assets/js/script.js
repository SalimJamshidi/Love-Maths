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
