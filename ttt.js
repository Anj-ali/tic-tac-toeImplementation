const statusDisplay = document.getElementById("game-status");
let gameActive = true;
let currentPlayer = "X";
let playerName = "Player1"
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Congratulations! ${playerName} wins`;
const drawMessage = () => `Draw!`;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell) {
    gameState[clickedCell - 1] = currentPlayer;
    document.getElementById(clickedCell).innerHTML = currentPlayer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerName = playerName === "Player1" ? "Player2" : "Player1";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];

        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        alert(statusDisplay.innerHTML);
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        alert(statusDisplay.innerHTML);
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(cellClickedEvent) {
    const clickedCell = parseInt(cellClickedEvent.target.getAttribute("id"));

    if (gameState[clickedCell -1] !== "" || !gameActive) {
        return;
    }
    console.log(clickedCell + "clicked");

    handleCellPlayed(clickedCell);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    playerName = "Player1";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", handleCellClick));
document.getElementById("restart").addEventListener("click", handleRestartGame);