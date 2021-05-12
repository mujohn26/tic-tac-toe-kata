
class Validation {
  constructor() {
    this.winCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];
  }

  static ___isValidMove(board, index) {
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

  static isGameOver(board, player) {
    var i, j, markCount;
    const validation = new Validation();
    for (i = 0; i < validation.winCombinations.length; i++) {
      markCount = 0;
      for (j = 0; j < validation.winCombinations.length; j++) {
        if (board[validation.winCombinations[i][j]] === player.symbol) {
          markCount++;
        }
        if (markCount === 3) {
          return true;
        }
      }
    }
    return false;
  }
}

export default Validation;
