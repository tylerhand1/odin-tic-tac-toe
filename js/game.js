const State = (moves) => {
    let toMove = 0;
    let utility = 0;
    let board = {};
    for(let i = 0; i < 3; i++) {
        board[i] = {};
    }

    return {
        toMove, utility, board, moves
    };
};

const gameboard = (function () {
    let playerDisplay = false;
    let moves = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    let state = State(moves);
    let turn = 0;
    let aiEnabled = false;
    let started = false;

    const turnLimit = 9;
    const boardElements = [...document.querySelectorAll('.game-space')];
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');

    // Display elements
    const customSelect = document.querySelector('.custom-select');
    const playerTurn = document.querySelector('.player-turn');
    const playerTurnMsg = document.querySelector('.player-turn h3');

    // Player mode
    const mode = document.querySelector('#game-type');

    const createBtnEventListeners = () => {
        startBtn.addEventListener('click', _start);
        restartBtn.addEventListener('click', _clearBoard);
    };

    const _start = () => {
        started = true;
        _createEventListeners();
        if(!playerDisplay) {
            _togglePlayerDisplay();
            playerDisplay = true;
        }
        if(mode[0].selected) {
            aiEnabled = false;
        } else {
            aiEnabled = true;
        }
        playerTurnMsg.textContent = `Player ${state.toMove === 0 ? 'X' : 'O'}'s Turn`;
    };

    const _createEventListeners = () => {
        boardElements.forEach(boardElement => boardElement.addEventListener('click', makeMove));
    };

    const _togglePlayerDisplay = () => {
        customSelect.classList.toggle('active');
        playerTurn.classList.toggle('active');
    };

    const _result = (move, state) => {
        let row = move[0];
        let col = move[1];
        let newState = {...state};
        newState.board[row][col] = state.toMove;

        delete newState.board[row][col];

        newState.utility = _computeUtility(move, state);

        return newState;
    };

    const _computeUtility = (move, state) => {
        let row = move[0];
        let col = move[1];
        let player = state.toMove;

        let board = {...state.board};
        board[row][col] = player;

        // Check for a win
        let winCount = 0;
        // Check rows
        for(let i = 0; i < 3; i++) {
            if(board[i][0] === undefined || board[i][1] === undefined  || board[i][2] === undefined ) { /* Check if any relevant space empty */
                continue;
            }
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                winCount++;
                break;
            }
        }
        // Check cols
        for(let i = 0; i < 3; i++) {
            if(board[0][i] === undefined || board[1][i] === undefined  || board[2][i] === undefined ) { /* Check if any relevant space empty */
                continue;
            }
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                winCount++;
                break;
            }
        }
        // Check top left-bottom right diagonal
        if(board[0][0] !== undefined && board[1][1] !== undefined  && board[2][2] !== undefined ) { /* Check if any relevant space empty */
            if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                winCount++;
            }
        }
        // Check bottom left-top right diagonal
        if(board[2][0] !== undefined && board[1][1] !== undefined  && board[0][2] !== undefined ) { /* Check if any relevant space empty */
            if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
                winCount++;
            }
        }

        if(winCount > 0) {
            return player === 0 ? 1 : -1;
        }

        return 0;
    };

    const _gameOver = (state) => {
        return state.utility !== 0 || state.moves.length === 0;
    };

    const _utility = () => {
        if(state.utility === 0) {
            return 0;
        }
        return state.toMove === 0 ? state.utility : (-1) * state.utility;
    };

    const _validMove = (move, state) => {
        let row = move[0];
        let col = move[1];
        if(state.board[row][col] !== undefined) {
            return false;
        }
        return true;
    };

    const _updateBoard = () => {
        let counter = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(state.board[i][j] !== undefined) {
                    boardElements[counter].textContent = state.board[i][j] === 0 ? 'X' : 'O';
                }
                counter++;
            }
        }
    };

    const makeMove = (e) => {
        if(!started) {
            return;
        }
        // Convert data-index to (row, col)
        let row, col;
        if(e.target.attributes[1].value < 3) {
            row = 0;
            col = Number.parseInt(e.target.attributes[1].value);
        } else if (e.target.attributes[1].value < 6) {
            row = 1;
            col = Number.parseInt(e.target.attributes[1].value - 3);
        } else {
            row = 2;
            col = Number.parseInt(e.target.attributes[1].value - 6);
        }
        if(!_validMove([row, col], state)) {
            return;
        }
        turn++;

        state = _result([row, col], state);
        _updateBoard();
        let result = _utility();
        if(result === 0) {
            // Check for tie
            if(turn === turnLimit) {
                playerTurnMsg.textContent = `Tie!`;
            } else {
                state.toMove = 1 - state.toMove;
                playerTurnMsg.textContent = `Player ${state.toMove === 0 ? 'X' : 'O'}'s Turn`;
            }
        } else  {
            playerTurnMsg.textContent = `Player ${state.toMove === 0 ? 'X' : 'O'} Won!`;
        }
        if(_gameOver(state)) {
            return state.utility;
        }

        if(aiEnabled) {
            // Call function to determine minmax move
            _alphabetaMove();
        }
    };

    const _maxValue = (alpha, beta) => {

    };

    const _minValue = (alpha, beta) => {

    };

    const _alphabetaMove = () => {

    };

    const _clearBoard = () => {
        started = false;
        state = State(moves);
        if(playerDisplay) {
            _togglePlayerDisplay();
            playerTurnMsg.textContent = ``;
        }
        playerDisplay = false;
        let counter = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                boardElements[counter++].textContent = '';
            }
        }
    };

    return {
        createBtnEventListeners,
    };
})();

gameboard.createBtnEventListeners();