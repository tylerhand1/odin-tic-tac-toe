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
    const players = ['X', 'O'];
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    const boardElements = [...document.querySelectorAll('.game-space')];

    const createEventListeners = () => {
        boardElements.forEach(boardElement => boardElement.addEventListener('click', makeMove));
    };

    const _checkGameOver = () => {s
        // Check rows
        for(let i = 0; i < board.length; i++) {
            if(board[i][0] === '' || board[i][1] === ''  || board[i][2] === '' ) { /* Check if any relevant space empty */
                continue;
            }
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return true;
            }
        }
        // Check cols
        for(let i = 0; i < board.length; i++) {
            if(board[0][i] === '' || board[1][i] === ''  || board[2][i] === '' ) { /* Check if any relevant space empty */
                continue;
            }
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return true;
            }
        }
        // Check top left-bottom right diagonal
        if(board[0][0] === '' && board[1][1] === ''  && board[2][2] === '' ) { /* Check if any relevant space empty */
            if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                return true;
            }
        }
        
        // Check bottom left-top right diagonal
        if(board[2][0] === '' && board[1][1] === ''  && board[0][2] === '' ) { /* Check if any relevant space empty */
            if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                return true;
            }
        }
        // No win found
        return false;
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
        _checkGameOver();
        _switchPlayer();
    };

    const clearBoard = () => {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                board[i][j] = '';
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
        makeMove,
        clearBoard,
    };
})();

gameboard.createEventListeners();