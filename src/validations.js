import Winner from "./winner";



class Validation {
  
  constructor() {
    // This can be a static constant variable
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

  static isEmptyBoard(board) {
    return board.every((value) => {
      return value !== "X" && value !== "O";
    });
  }

  static isGameOver(board) {
    const validation = new Validation();
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

    const winner = new Winner(validation.winCombinations);
    if (winner.getWinner(board)) {
      return true;
    }
    return false;
  }
}

export default Validation;
