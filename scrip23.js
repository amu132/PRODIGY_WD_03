document.addEventListener("DOMContentLoaded", function () {
    const statusDisplay = document.querySelector('.game--status');
    let gameActive = true;
    let currentPlayer = "X";
    let player1Name = prompt("Enter Player 1 name:", "Player 1");
    let player2Name = prompt("Enter Player 2 name:", "Player 2");
    let isAIPlayer = confirm("Do you want to play against the AI?");
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningMessage = (winner) => `${winner} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer === "X" ? player1Name : (isAIPlayer ? "AI" : player2Name)}'s turn`;

    statusDisplay.innerHTML = currentPlayerTurn();

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let player1Wins = 0;
    let player2Wins = 0;

    // Add this function at the beginning of your code
    function startGame() {
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
        document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

        if (isAIPlayer && currentPlayer === "O") {
            // If AI is the starting player, make an initial move
            setTimeout(handleAIPlayerMove, 500);
        }
    }

    // Replace the existing event listener with this one
    document.addEventListener("DOMContentLoaded", startGame);

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        if (currentPlayer === "X") {
            clickedCell.classList.add("player1-cell");
        } else {
            clickedCell.classList.add("player2-cell");
        }
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();

        if (isAIPlayer && currentPlayer === "O") {
            setTimeout(handleAIPlayerMove, 500);
        }
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') continue;
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage(currentPlayer === "X" ? player1Name : (isAIPlayer ? "AI" : player2Name));
            gameActive = false;

            if (currentPlayer === "X") {
                player1Wins++;
            } else {
                player2Wins++;
            }

            alert(`${player1Name}: ${player1Wins} wins\n${isAIPlayer ? "AI" : player2Name}: ${player2Wins} wins`);
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) return;

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        player1Name = prompt("Enter Player 1 name:", "Player 1");
        player2Name = prompt("Enter Player 2 name:", "Player 2");
        isAIPlayer = confirm("Do you want to play against the AI?");
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove("player1-cell", "player2-cell");
        });

        if (isAIPlayer && currentPlayer === "O") {
            setTimeout(handleAIPlayerMove, 500);
        }
    }

    function handleAIPlayerMove() {
        const emptyCells = document.querySelectorAll('.cell[data-cell-index=""]:not([disabled])');
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const aiCell = emptyCells[randomIndex];
            const aiCellIndex = parseInt(aiCell.getAttribute('data-cell-index'));
            handleCellPlayed(aiCell, aiCellIndex);
            handleResultValidation();
        }
    }
});
