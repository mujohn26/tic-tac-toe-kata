class Board {
  constructor() {
    this.values =  Array.apply(null, { length: 9 }).map(function (_, index) {
      return index ;
    });
  }

  mark(index, symbol) {
    if (this.values[index] !== 'X' && this.values[index]!=='O') {
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
      " ----------\n" +
      " " +
      this.values[3] +
      " | " +
      this.values[4] +
      " | " +
      this.values[5] +
      "\n" +
      " ----------\n" +
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
