class Board {
  constructor() {
    this.values = new Array(9).fill(null);
  }

  mark(index, symbol) {
    if (this.values[index] === null) {
      this.values[index] = symbol;
    }
  }

  print() {
    const returnData =
      "\n" +
      " " +
      this.values[0] +
      " | " +
      this.values[1] +
      " | " +
      this.values[2] +
      "\n" +
      " ------------------\n" +
      " " +
      this.values[3] +
      " | " +
      this.values[4] +
      " | " +
      this.values[5] +
      "\n" +
      " ------------------\n" +
      " " +
      this.values[6] +
      " | " +
      this.values[7] +
      " | " +
      this.values[8] +
      "\n";
    return returnData;
  }
}

export default Board;
