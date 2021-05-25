import Winner from "./winner";
import Board from "./board";
import Validation from "./validations";
import HumanPlayer from "./player";

describe("Winner", () => {
  describe(".getWinner", () => {
    it("returns X as  winner of the game", () => {
      const board = new Board();
      const validation = new Validation();
      const winner = new Winner(validation.winCombinations);
      board.mark(0, "X");
      board.mark(1, "X");
      board.mark(2, "X");
      expect(winner.getWinner(board.values)).toEqual("X");
    });

    it("returns Null if there is a draw", () => {
      const board = new Board();
      const validation = new Validation();
      const winner = new Winner(validation.winCombinations);
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      board.mark(3, "0");
      board.mark(4, "X");
      board.mark(5, "0");
      board.mark(6, "0");
      board.mark(7, "X");
      board.mark(8, "0");
      expect(winner.getWinner(board.values)).toBeNull();
    });

    it("returns player1 as  winner of the game", () => {
      const player1 = new HumanPlayer("X");
      const board = new Board();
      const validation = new Validation();
      const winner = new Winner(validation.winCombinations);
      board.mark(0, player1);
      board.mark(1, player1);
      board.mark(2, player1);
      expect(winner.getWinner(board.values)).toEqual(player1);
    });

    it("returns X as the winner", () => {
      const board = new Board();
      const validation = new Validation();
      const winner = new Winner(validation.winCombinations);
      board.mark(2, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      expect((winner.getWinner(board.values))).toEqual('X');
    });
  });
});
