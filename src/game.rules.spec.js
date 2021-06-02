import GameRules from "./game.rules";
import { Board } from "./board";
import HumanPlayer from "./player";

describe("Game rules", () => {
  describe(".___isValidMove", () => {
    it("returns false if move is a string", () => {
      const board = new Board();
      expect(GameRules.isValidMove(board.values, "j")).toEqual(false);
    });
    it("returns false if move is less than 0", () => {
      const board = new Board();
      expect(GameRules.isValidMove(board.values, -1)).toEqual(false);
    });
    it("returns false if move is greater than 9", () => {
      const board = new Board();
      expect(GameRules.isValidMove(board.values, 10)).toEqual(false);
    });
    it("returns false if board position is marked with 'X' ", () => {
      const board = new Board();
      board.mark(1, "X");
      expect(GameRules.isValidMove(board.values, 1)).toEqual(false);
    });
    it("returns false if board position is marked with 'O' ", () => {
      const board = new Board();
      board.mark(4, "O");
      expect(GameRules.isValidMove(board.values, 4)).toEqual(false);
    });
    it("returns true if board position is valid ", () => {
      const board = new Board();
      expect(GameRules.isValidMove(board.values, 6)).toEqual(true);
    });
  });

  describe(".isGameOver", () => {
    it("returns false for an empty board", () => {
      const board = new Board();
      expect(GameRules.isGameOver(board.values)).toEqual(false);
    });
    it("returns true  when the board is marked with any win option  ", () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "X");
      board.mark(2, "X");
      expect(GameRules.isGameOver(board.values)).toEqual(true);
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
      expect(GameRules.isGameOver(board.values)).toEqual(true);
    });

    it("returns true when the board mark on win combination is the same", () => {
      const board = new Board();
      board.mark(2, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      expect(GameRules.isGameOver(board.values)).toEqual(true);
    });
  });

  describe(".isEmptyBoard", () => {
    it("returns true for an empty board", () => {
      const board = new Board();
      expect(GameRules.isEmptyBoard(board.values)).toEqual(true);
    });
  });

  describe(".getWinner", () => {
    it("returns X as  winner of the game", () => {
      const board = new Board();
      const gameRules = new GameRules();
      board.mark(0, "X");
      board.mark(1, "X");
      board.mark(2, "X");
      expect(gameRules.getWinner(board.values)).toEqual("X");
    });

    it("returns Null if there is a draw", () => {
      const board = new Board();
      const gameRules = new GameRules();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      board.mark(3, "0");
      board.mark(4, "X");
      board.mark(5, "0");
      board.mark(6, "0");
      board.mark(7, "X");
      board.mark(8, "0");
      expect(gameRules.getWinner(board.values)).toBeNull();
    });

    it("returns player1 as  winner of the game", () => {
      const player1 = new HumanPlayer("X");
      const board = new Board();
      const gameRules = new GameRules();
      board.mark(0, player1);
      board.mark(1, player1);
      board.mark(2, player1);
      expect(gameRules.getWinner(board.values)).toEqual(player1);
    });

    it("returns X as the winner", () => {
      const board = new Board();
      const gameRules = new GameRules();
      board.mark(2, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      expect(gameRules.getWinner(board.values)).toEqual("X");
    });
  });

  describe(".getEmptyIndexies", () => {
    it("returns empty indexies on the board", () => {
      const board = new Board();
      board.mark(2, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      const returnData = [0, 1, 3, 5, 7, 8];
      expect(GameRules.getEmptyIndexies(board.values)).toEqual(returnData);
    });
  });

  describe(".getAiWinner", () => {
    it("returns true if X wins", () => {
      const board = new Board();
      board.mark(3, "X");
      board.mark(4, "X");
      board.mark(5, "X");
      expect(GameRules.getAiWinner(board.values, "X")).toEqual(true);
    });
    it("returns true if X wins", () => {
      const board = new Board();
      board.mark(3, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      expect(GameRules.getAiWinner(board.values, "X")).toEqual(false);
    });
  });
});
