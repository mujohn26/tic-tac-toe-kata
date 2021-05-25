import Validation from "./validations";
import Board from "./board";

describe("Validation", () => {
  describe(".___isValidMove", () => {
    it("returns false if move is a string", () => {
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
  });

  describe(".isGameOver", () => {
    it("returns false for an empty board", () => {
      const board = new Board();
      expect(Validation.isGameOver(board.values)).toEqual(false);
    });
    it("returns true  when the board is marked with any win option  ", () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "X");
      board.mark(2, "X");
      expect(Validation.isGameOver(board.values)).toEqual(true);
    });

    it("returns true when the board is full", () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      board.mark(3, "0");
      board.mark(4, "X");
      board.mark(5, "0");
      board.mark(6, "X");
      board.mark(7, "X");
      board.mark(8, "0");
      expect(Validation.isGameOver(board.values)).toEqual(true);
    });

    it("returns true when the board mark on win combination is the same", () => {
      const board = new Board();
      board.mark(2, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      expect(Validation.isGameOver(board.values)).toEqual(true);
    });
  });

  describe(".isEmptyBoard", () => {
    it("returns true for an empty board", () => {
      const board = new Board();
      expect(Validation.isEmptyBoard(board.values)).toEqual(true);
    });
  });
});
