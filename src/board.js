export class Board {
  constructor() {
    this.values = new Array(9).fill(null);
  }

  mark(index, symbol) {
    if (this.values[index] !== "X" && this.values[index] !== "O") {
      this.values[index] = symbol;
    }
  }

  setValues(value, board, type) {
    let arrayData;
 
    if (type === "number") {
      arrayData = board.map((i, index) => {
        const data = i === null ? index : i;
        return data;
      });
    } else {
      arrayData = board.map((i, index) => {
        const data = i === null ? value : i;
        return data;
      });
    }
    this.values = arrayData;
    return this.values;
  }
}

export class BoardPrinter {
  constructor() {
    this.board = new Board();
  }
  printer(value, board, type) {
    this.board.setValues(value, board, type);
    const returnData =
      "\n" +
      " " +
      this.board.values[0] +
      " | " +
      this.board.values[1] +
      " | " +
      this.board.values[2] +
      "\n" +
      " ----------\n" +
      " " +
      this.board.values[3] +
      " | " +
      this.board.values[4] +
      " | " +
      this.board.values[5] +
      "\n" +
      " ----------\n" +
      " " +
      this.board.values[6] +
      " | " +
      this.board.values[7] +
      " | " +
      this.board.values[8] +
      "\n";
    return returnData;
  }
}
