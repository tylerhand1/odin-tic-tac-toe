const Player = (marker, score) => {
    const getMarker = () => marker;
    const getScore = () => score;

    return {
        getMarker, getScore
    };
};

const playerOne = Player('X', 0);
const playerTwo = Player('O', 0);

const gameboard = (function () {
    let currPlayer = 0;
    let gameOver = false;
    let playerDisplay = false;
    const players = ['X', 'O'];
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    const boardElements = [...document.querySelectorAll('.game-space')];
    const restartBtn = document.querySelector('#restart-btn');
    // Display elements
    const customSelect = document.querySelector('.custom-select');
    const playerTurn = document.querySelector('.player-turn');
    const playerTurnMsg = document.querySelector('.player-turn h3');

    const createRestartEventListener = () => {
        restartBtn.addEventListener('click', clearBoard);
    };

    const createEventListeners = () => {
        boardElements.forEach(boardElement => boardElement.addEventListener('click', makeMove));
    };

    const _removeEventListeners = () => {
        boardElements.forEach(boardElement => boardElement.removeEventListener('click', makeMove));
    }

    const _togglePlayerDisplay = () => {
        customSelect.classList.toggle('active');
        playerTurn.classList.toggle('active');
    }

    const _checkGameOver = () => {
        let winner = 0; // -1: X, 0: tie, 1: Y
        let tie = true;
        // Check rows
        for(let i = 0; i < board.length; i++) {
            if(board[i][0] === '' || board[i][1] === ''  || board[i][2] === '' ) { /* Check if any relevant space empty */
                continue;
            }
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                if(board[i][0] === 'X') {
                    winner = -1;
                } else {
                    winner = 1;
                }
                gameOver = true;
            }
        }
        // Check cols
        for(let i = 0; i < board.length; i++) {
            if(board[0][i] === '' || board[1][i] === ''  || board[2][i] === '' ) { /* Check if any relevant space empty */
                continue;
            }
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                if(board[0][i] === 'X') {
                    winner = -1;
                } else {
                    winner = 1;
                }
                gameOver = true;
            }
        }
        // Check top left-bottom right diagonal
        if(board[0][0] !== '' && board[1][1] !== ''  && board[2][2] !== '' ) { /* Check if any relevant space empty */
            if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                if(board[0][0] === 'X') {
                    winner = -1;
                } else {
                    winner = 1;
                }
                gameOver = true;
            }
        }
        
        // Check bottom left-top right diagonal
        if(board[2][0] !== '' && board[1][1] !== ''  && board[0][2] !== '' ) { /* Check if any relevant space empty */
            if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                if(board[2][0] === 'X') {
                    winner = -1;
                } else {
                    winner = 1;
                }
                gameOver = true;
            }
        }
        if(winner === 0) {
            for(let i = 0; i < board.length; i++) {
                if(board[i][0] === '' || board[i][1] === '' || board[i][2] === '') {
                    tie = false;
                }
            }
        }
            
        if(gameOver || tie) {
            _removeEventListeners();
        }
        // No win found
        return winner;
    };

    const _updateBoard = () => {
        let counter = 0;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                boardElements[counter++].textContent = board[i][j];
            }
        }
    };

    const _switchPlayer = () => {
        currPlayer = 1 - currPlayer;
    }

    const makeMove = (e) => {
        if(!playerDisplay) {
            _togglePlayerDisplay();
            playerDisplay = true;
        }
        // Convert data-index to (row, col)
        let row, col;
        if(e.target.attributes[1].value < 3) {
            row = 0;
            col = e.target.attributes[1].value;
        } else if (e.target.attributes[1].value < 6) {
            row = 1;
            col = e.target.attributes[1].value - 3;
        } else {
            row = 2;
            col = e.target.attributes[1].value - 6;
        }
        if(board[row][col] !== '') {
            return;
        }
        board[row][col] = players[currPlayer];
        _updateBoard();
        _checkGameOver();
        _switchPlayer();
        
        playerTurnMsg.textContent = `Player ${players[currPlayer]}'s Turn`;
    };

    const clearBoard = () => {
        currPlayer = 0;
        playerDisplay = false;
        gameOver = false;
        if(playerDisplay) {
            _togglePlayerDisplay();
            playerTurnMsg.textContent = ``;
        }
        playerDisplay = false;
        let counter = 0;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                board[i][j] = '';
                boardElements[counter++].textContent = '';
            }
        }
    };

    const _printBoard = () => {
        for(let i = 0; i < board.length; i++) {
            console.log(board[i][0], board[i][1], board[i][2]);
        }
    };

    return {
        createEventListeners,
        createRestartEventListener,
        makeMove,
        clearBoard,
    };
})();

gameboard.createEventListeners();
gameboard.createRestartEventListener();