class GameRules {
  static winCombinations = [
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
    for (let i = 0; i < GameRules.winCombinations.length; i++) {
      const firstValue = board[GameRules.winCombinations[i][0]];
      const winnerExists = GameRules.winCombinations[i].every(
        (value) => board[value] === firstValue && board[value] !== null
      );
      if (winnerExists) {
        return board[GameRules.winCombinations[i][0]];
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
    if (board[index] === "X" || board[index] === "O") {
      return false;
    }
    return true;
  }

  static isEmptyBoard(board) {
    return board.every((value) => {
      return value !== "X" && value !== "O";
    });
  }

  static isGameOver(board) {
    const gameRules = new GameRules();
    if (this.isEmptyBoard(board)) {
      return false;
    }

    if (
      board.every((value) => {
        return value === "X" || value === "O";
      })
    ) {
      return true;
    }

    if (gameRules.getWinner(board)) {
      return true;
    }
    return false;
  }
}

export default GameRules;
