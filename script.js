const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');

const scoreCardX = document.getElementById('scoreX');
const scoreCardO = document.getElementById('scoreO');
const scoreCardTie = document.getElementById('scoreTie');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

let scores = {
    X: 0,
    O: 0,
    Tie: 0
};

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize
updateStatus();

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    placeMark(cell, cellIndex);
    checkWinOrDraw();
}

function placeMark(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function checkWinOrDraw() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        handleWin(winningLine);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        handleDraw();
        return;
    }

    swapTurns();
}

function handleWin(winningLine) {
    gameActive = false;
    
    statusText.textContent = `Player ${currentPlayer} Wins`;
    statusText.className = `status-indicator status-${currentPlayer.toLowerCase()}`;
    
    scores[currentPlayer]++;
    updateScoreBoard();

    // Highlight winning cells
    winningLine.forEach(index => {
        cells[index].classList.add('win');
    });
}

function handleDraw() {
    gameActive = false;
    statusText.textContent = "It's a Tie";
    statusText.className = 'status-indicator status-tie';
    
    scores.Tie++;
    updateScoreBoard();
}

function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

function updateStatus() {
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    statusText.className = `status-indicator status-${currentPlayer.toLowerCase()}`;
}

function updateScoreBoard() {
    scoreCardX.textContent = scores.X;
    scoreCardO.textContent = scores.O;
    scoreCardTie.textContent = scores.Tie;
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    updateStatus();

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });
}
