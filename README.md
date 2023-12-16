Tic Tac Toe Game


This is a simple implementation of a Tic Tac Toe game using HTML, CSS, and JavaScript. The game allows two players to take turns placing their markers ('X' or 'O') on a 3x3 grid. The game ends when one player wins by forming a line of three consecutive markers or when the entire grid is filled, resulting in a draw.

Usage
To use the Tic Tac Toe game:

Open the index.html file in a web browser.
Click on the cells to make your moves.

The game status will be displayed at the top, indicating whose turn it is or if the game has ended.

Game Rules
Players take turns placing their markers on an empty cell.
The game ends when one player forms a line of three consecutive markers horizontally, vertically, or diagonally.
If the entire grid is filled without a winner, the game ends in a draw.

Code Structure
index.html: The HTML file containing the structure of the game.
style.css: The CSS file for styling the game.
script.js: The JavaScript file containing the game logic.

Functions
handleCellPlayed: Updates the game state and the display when a cell is clicked.
handlePlayerChange: Switches the current player after a move.
handleResultValidation: Checks for a winner or a draw after each move.
handleCellClick: Event handler for cell clicks, invoking the above functions.
handleRestartGame: Resets the game to its initial state.
License
This project is licensed under @amoghgaikwad 
