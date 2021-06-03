class GameRules {
  static WIN_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  getWinner(board) {
    for (let i = 0; i < GameRules.WIN_COMBINATIONS.length; i++) {
      const firstValue = board[GameRules.WIN_COMBINATIONS[i][0]];
      const winnerExists = GameRules.WIN_COMBINATIONS[i].every(
        (value) => board[value] === firstValue && board[value] !== null
      );
      if (winnerExists) {
        return board[GameRules.WIN_COMBINATIONS[i][0]];
      }
    }
    return null;
  }

  static isValidMove(board, index) {
    if (isNaN(index)) {
      return false;
    }
    if (index > 9 || index < 0) {
      return false;
    }
    if (board[index] !== null) {
      return false; 
    }

    return true;
  }

  static isEmptyBoard(board) {
    return board.every((value) => {
      return value === null;
    });
  }

  static isGameOver(board) {
    const gameRules = new GameRules();
    if (this.isEmptyBoard(board)) {
      return false;
    }

    if (
      board.every((value) => {
        return value !== null;
      })
    ) {
      return true;
    }

    if (gameRules.getWinner(board)) {
      return true;
    }
    return false;
  }

  static getEmptyIndexies(boadValues) {
    return boadValues.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  static getAiWinner(boardValues, player) {
    for (let i = 0; i < GameRules.WIN_COMBINATIONS.length; i++) {
      const winnerExists = GameRules.WIN_COMBINATIONS[i].every(
        (value) => boardValues[value] === player
      );
      if (winnerExists) {
        return true;
      }
    }
    return false;
  }
}

export default GameRules;
