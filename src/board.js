export class Board {
  constructor() {
    this.values = new Array(9).fill(null);
  }

  mark(index, symbol) {
    if (this.values[index] === null) {
      this.values[index] = symbol;
    }
  }
}

export class BoardPrinter {
  constructor(options) {
    this.emptyMark =  options.emptyMark;
  }
  printer(boardValues) {
    const print = (boardValues, index) => {
      if(boardValues[index] === null) {
        if(this.emptyMark === "number") {
          return index;
        }
        else if(this.emptyMark === "space") {
          return " ";
        }
        else {
          return this.emptyMark;
        }
      }
      else {
        return boardValues[index];
      }
    }
    const returnData =
      "\n" +
      " " +
      print(boardValues, 0) +
      " | " +
      print(boardValues, 1) +
      " | " +
      print(boardValues, 2) +
      "\n" +
      " ----------\n" +
      " " +
      print(boardValues, 3) +
      " | " +
      print(boardValues, 4) +
      " | " +
      print(boardValues, 5) +
      "\n" +
      " ----------\n" +
      " " +
      print(boardValues, 6) +
      " | " +
      print(boardValues, 7) +
      " | " +
      print(boardValues, 8) +
      "\n";
    return returnData;
  }
}
