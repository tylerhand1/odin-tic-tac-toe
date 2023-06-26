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
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    // Display elements
    const customSelect = document.querySelector('.custom-select');
    const playerTurn = document.querySelector('.player-turn');
    const playerTurnMsg = document.querySelector('.player-turn h3');

    const createBtnEventListeners = () => {
        startBtn.addEventListener('click', _start);
        restartBtn.addEventListener('click', clearBoard);
    };

    const _start = () => {
        _createEventListeners();
        if(!playerDisplay) {
            _togglePlayerDisplay();
            playerDisplay = true;
        }
        playerTurnMsg.textContent = `Player ${players[currPlayer]}'s Turn`;
    }

    const _createEventListeners = () => {
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
        let winner = 2; // -1: X, 0: tie, 1: Y, 2: game not over
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
        if(winner === 2) {
            for(let i = 0; i < board.length; i++) {
                if(board[i][0] === '' || board[i][1] === '' || board[i][2] === '') {
                    tie = false;
                }
            }
            if(tie) {
                winner = 0;
            }
        }
            
        if(gameOver || tie) {
            _removeEventListeners();
        }

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
        let result = _checkGameOver();
        if(result !== 0) {
            if(result === 2) {
                _switchPlayer();
                playerTurnMsg.textContent = `Player ${players[currPlayer]}'s Turn`;
            } else {
                playerTurnMsg.textContent = `Player ${players[currPlayer]} Won!`;
            }
        } else  {
            playerTurnMsg.textContent = `Tie!`;
        }
    };

    const clearBoard = () => {
        currPlayer = 0;
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
        createBtnEventListeners,
        makeMove,
        clearBoard,
    };
})();

gameboard.createBtnEventListeners();