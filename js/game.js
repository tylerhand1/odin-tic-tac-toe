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
    const players = ['X', 'Y'];
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    const _checkGameOver = () => {
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
            if(board[2][0] === board[1][i] && board[1][i] === board[0][2]) {
                return true;
            }
        }
        // No win found
        return false;
    };
    const makeMove = (row, col, player) => {
        if(board[row][col] !== '') {
            return;
        }
        board[row][col] = player;
        _checkGameOver();
    }
    return {
        makeMove,
    };
})();