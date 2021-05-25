class Winner {
  constructor(winCombinations) {
    this.winCombinations = winCombinations;
  }
  getWinner(board) {
    for (let i = 0; i < this.winCombinations.length; i++) {
      const firstValue = board[this.winCombinations[i][0]];
      const winnerExists = this.winCombinations[i].every(
        (value) => board[value] === firstValue && board[value] !== null
      );
      if (winnerExists) {
        return board[this.winCombinations[i][0]];
      }
    }
    return null;
  }
}

export default Winner;
