import {Board} from "./board";

describe("Index", () => {
  it("calls console.log with board", () => {
    const oldConsoleLog = console.log;
    console.log = jest.fn(() => {});
    const consoleSpy = jest.spyOn(console, "log");
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
      " ------------------\n" +
      " " +
      board.values[3] +
      " | " +
      board.values[4] +
      " | " +
      board.values[5] +
      "\n" +
      " ------------------\n" +
      " " +
      board.values[6] +
      " | " +
      board.values[7] +
      " | " +
      board.values[8] +
      "\n";
    console.log(returnData);
    console.log = oldConsoleLog;
    expect(consoleSpy).toHaveBeenCalledWith(returnData);
  });

  it("plays the game", () => {
    // const game = new Game(["human", "human"]);
    
    // Expect human1 to get prompt.
    // Human1 enters 0.

    // Expect human2 to get prompt.
    // Human2 enters 5.

  })
});
