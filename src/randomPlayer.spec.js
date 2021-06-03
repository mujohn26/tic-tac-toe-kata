import { RandomPlayer } from "./player/randomPlayer";
import { Board } from "./board";

describe("Random player", () => {

  describe(".getMove", () => {
    it("Returns a move", async () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      const randomPlayer = new RandomPlayer();
      expect(await randomPlayer.getMove(board.values)).toBeGreaterThanOrEqual(
        3
      );
      expect(await randomPlayer.getMove(board.values)).toBeLessThanOrEqual(8);
    });

    it("returns a number greater than 0", async () => {
      const board = new Board();
      const randomPlayer = new RandomPlayer();
      expect(await randomPlayer.getMove(board.values)).toBeGreaterThanOrEqual(
        0
      );
    });

    it("returns a number less than or equal to 8", async () => {
      const board = new Board();
      const randomPlayer = new RandomPlayer();
      expect(await randomPlayer.getMove(board.values)).toBeLessThanOrEqual(8);
    });

    it("returns a number to equal to 4", async () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      board.mark(3, "X");
      board.mark(5, "0");
      board.mark(6, "X");
      board.mark(7, "0");
      board.mark(8, "X");
      const randomPlayer = new RandomPlayer();
      expect(await randomPlayer.getMove(board.values)).toEqual(4);
    });
  });
});
