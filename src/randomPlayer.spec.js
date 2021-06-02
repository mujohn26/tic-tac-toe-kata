import { RandomPlayer } from "./random.player";
import GameRules from "./game.rules";
import { Board } from "./board";

describe("Random player", () => {
  describe(".getRandomMove", () => {
    it("Returns a random index", async () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      expect(RandomPlayer.getRandomIndex(board.values)).toBeGreaterThanOrEqual(3);
      expect(RandomPlayer.getRandomIndex(board.values)).toBeLessThanOrEqual(8);
    });
  });
  describe(".getMove", () => {
    it("Returns a move", async () => {
      const board = new Board();
      board.mark(0, "X");
      board.mark(1, "0");
      board.mark(2, "X");
      const randomPlayer = new RandomPlayer();
      expect(await randomPlayer.getMove(board.values)).toBeGreaterThanOrEqual(3);
      expect(await randomPlayer.getMove(board.values)).toBeLessThanOrEqual(8);
    });
  });
});
