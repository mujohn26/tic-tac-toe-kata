import { Board } from "./board";
import { AiPlayer } from "./ai.player";

describe("AI Player", () => {
  describe(".getMove", () => {
    it("Returns 1 as next move", async() => {
      const board = new Board();
      const aiPlayer =  new AiPlayer()
      board.mark(0, "O");
      board.mark(4, "X");
      board.mark(5, "O");
      expect(await aiPlayer.getMove(board.values, 'X')).toEqual(1);
    });
    it("Returns 0 as next move", async() => {
      const board = new Board();
      const aiPlayer = new AiPlayer();
      board.mark(3, "X");
      board.mark(4, "X");
      board.mark(5, "X");
      expect(await aiPlayer.getMove(board.values, 'O')).toEqual(0);
    });
    it("Returns 0 as next move", async () => {
      const board = new Board();
      const aiPlayer = new AiPlayer();
      board.mark(3, "X");
      board.mark(4, "X");
      board.mark(5, "X");
      expect(await aiPlayer.getMove(board.values, "O")).toEqual(0);
    });
 
  });
});
