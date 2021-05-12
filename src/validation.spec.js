import Validation from "./validations";
import Board from "./board";

describe("Validation", () => {
  it("returns false if move is not string", () => {
    const board = new Board();
    expect(Validation.___isValidMove(board.values, "j")).toEqual(false);
  });
  it("returns false if move is less than 0", () => {
    const board = new Board();
    expect(Validation.___isValidMove(board.values, -1)).toEqual(false);
  });
  it("returns false if move is greater than 9", () => {
    const board = new Board();
    expect(Validation.___isValidMove(board.values, 10)).toEqual(false);
  });
  it("returns false if board position is marked with 'X' ", () => {
    const board = new Board();
    board.mark(1, "X");
    expect(Validation.___isValidMove(board.values, 1)).toEqual(false);
  });
  it("returns false if board position is marked with 'O' ", () => {
    const board = new Board();
    board.mark(4, "O");
    expect(Validation.___isValidMove(board.values, 4)).toEqual(false);
  });
  it("returns true if board position is valid ", () => {
    const board = new Board();
    expect(Validation.___isValidMove(board.values, 6)).toEqual(true);
  });
  it("returns false if there is no winner", () => {
    const board = new Board();
    expect(Validation.isGameOver(board.values, { symbol: "X" })).toEqual(false);
  });
  it("returns true if there is a winner", () => {
    const board = new Board();
    board.mark(3, "X");
    board.mark(4, "X");
    board.mark(5, "X");
    expect(Validation.isGameOver(board.values, { symbol: "X" })).toEqual(true);
  });
});
