class ValidationHelper {
  static validateMove = (position, board) => {
    if (isNaN(position)) {
      return false;
    }

    if (position > 9 || position < 1) {
      return false;
    }

    if (board[position] === "X" || board[position] === "O") {
      return false;
    }

    return true;
  };
}

export default ValidationHelper;
