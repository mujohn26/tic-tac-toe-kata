import { FirstMovePlayer } from "./player/firstMovePlayer";
import { Board } from "./board";

describe("First move player", () => {
  describe(".getMove", () => {
    it("Returns a first move if board is not marked", () => {
      const board = new Board();
      const firstMovePlayer = new FirstMovePlayer();
      expect(firstMovePlayer.getMove(board.values)).toEqual(0);
    });
    it("Returns a 2 move if board is marked", () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(7, "X");
      const firstMovePlayer = new FirstMovePlayer();
      expect(firstMovePlayer.getMove(board.values)).toEqual(2);
    });
    it("Returns a 4 move if all board postions are marked expect 4", () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      board.mark(3, "X");
      board.mark(5, "0");
      board.mark(6, "X");
      board.mark(7, "0");
      board.mark(8, "X");
      const firstMovePlayer = new FirstMovePlayer();
      expect(firstMovePlayer.getMove(board.values)).toEqual(4);
    });
  });
});
