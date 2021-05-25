import Board from "./board";

describe("Board", () => {
  it("creates an empty board instance", () => {
    const oldConsoleLog = console.log;
    console.log = jest.fn(() => {});

    console.log("print something");

    const board = new Board();
    expect(board.values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    console.log = oldConsoleLog;
  });

  it("marks the board with an X and index 0", () => {
    const board = new Board();

    board.mark(0, "X");
    expect(board.values).toEqual(["X", 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("marks the board with an O and index 1", () => {
    const board = new Board();

    board.mark(1, "O");

    expect(board.values).toEqual([0, "O", 2, 3, 4, 5, 6, 7, 8]);
  });

  it("does not overwrite a spot if it's already marked", () => {
    const board = new Board();

    board.mark(0, "X");
    board.mark(0, "O"); // Should this throw an error?

    expect(board.values).toEqual(["X", 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("prints empy board", () => {
    const oldConsoleLog = console.log;
    console.log = jest.fn(() => {});

    console.log("print something");

    const board = new Board();
    const returnData =
      "\n" +
      " " +
      board.values[0] +
      " | " +
      board.values[1] +
      " | " +
      board.values[2] +
      "\n" +
      " ----------\n" +
      " " +
      board.values[3] +
      " | " +
      board.values[4] +
      " | " +
      board.values[5] +
      "\n" +
      " ----------\n" +
      " " +
      board.values[6] +
      " | " +
      board.values[7] +
      " | " +
      board.values[8] +
      "\n";
    expect(board.print()).toEqual(returnData);

    console.log = oldConsoleLog;
  });
});
