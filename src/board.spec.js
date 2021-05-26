import { Board, BoardPrinter } from "./board";

describe("Board", () => {
  it("creates an empty board instance", () => {
    const oldConsoleLog = console.log;
    console.log = jest.fn(() => {});

    console.log("print something");

    const board = new Board();
    expect(board.values).toEqual([null, null, null, null, null, null, null, null, null]);

    console.log = oldConsoleLog;
  });

  it("marks the board with an X and index 0", () => {
    const board = new Board();

    board.mark(0, "X");
    expect(board.values).toEqual(["X", null, null, null, null, null, null, null, null]);
  });

  it("marks the board with an O and index 1", () => {
    const board = new Board();

    board.mark(1, "O");

    expect(board.values).toEqual([null, "O", null, null, null, null, null, null, null]);
  });

  it("does not overwrite a spot if it's already marked", () => {
    const board = new Board();

    board.mark(0, "X");
    board.mark(0, "O"); // Should this throw an error?

    expect(board.values).toEqual(["X", null, null, null, null, null, null, null, null]);
  });

  it("prints empy board of string or symbols", () => {
    const board = new Board()
    // board.setValues("-");
    const boardPrinter = new BoardPrinter()
    const returnData =
      "\n" +
      " " +
      "-" +
      " | " +
      "-" +
      " | " +
      "-" +
      "\n" +
      " ----------\n" +
      " " +
      "-" +
      " | " +
      "-" +
      " | " +
      "-" +
      "\n" +
      " ----------\n" +
      " " +
      "-" +
      " | " +
      "-" +
      " | " +
      "-" +
      "\n";
    expect(boardPrinter.printer("-", board.values)).toEqual(returnData);

  });
    it("prints if  board is marked", () => {
      const board = new Board();
          board.mark(0, "X");
      const boardPrinter = new BoardPrinter();
      const returnData =
        "\n" +
        " " +
        "X" +
        " | " +
        "-" +
        " | " +
        "-" +
        "\n" +
        " ----------\n" +
        " " +
        "-" +
        " | " +
        "-" +
        " | " +
        "-" +
        "\n" +
        " ----------\n" +
        " " +
        "-" +
        " | " +
        "-" +
        " | " +
        "-" +
        "\n";
      expect(boardPrinter.printer("-", board.values)).toEqual(returnData);
    });
      it("prints board of numbers", () => {
        const board = new Board();
        const boardPrinter = new BoardPrinter();
        const returnData =
          "\n" +
          " " +
          0 +
          " | " +
          1 +
          " | " +
          2 +
          "\n" +
          " ----------\n" +
          " " +
          3 +
          " | " +
          4 +
          " | " +
          5 +
          "\n" +
          " ----------\n" +
          " " +
          6 +
          " | " +
          7 +
          " | " +
          8 +
          "\n";
        expect(boardPrinter.printer("-", board.values, 'number')).toEqual(returnData);
      });
  
        it("prints board of numbers if board is marked", () => {
          const board = new Board();
          board.mark(0, "X");
          board.mark(4, "O");
          const boardPrinter = new BoardPrinter();
          const returnData =
            "\n" +
            " " +
            'X' +
            " | " +
            1 +
            " | " +
            2 +
            "\n" +
            " ----------\n" +
            " " +
            3 +
            " | " +
            'O' +
            " | " +
            5 +
            "\n" +
            " ----------\n" +
            " " +
            6 +
            " | " +
            7 +
            " | " +
            8 +
            "\n";
          expect(boardPrinter.printer("-", board.values, "number")).toEqual(
            returnData
          );
        });
});
