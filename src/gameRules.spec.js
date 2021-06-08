import GameRules from "./gameRules";
import { Board } from "./board";
import HumanPlayer from "./player/humanPlayer";
import { GameSetup } from "./game";

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

    it("returns true if the board is empty", () => {
      const board = new Board();
      board.mark(2, "X");
      board.mark(4, "X");
      board.mark(6, "X");
      
      // board.values = ref1 ref1 -> [0, 1, 'X', 3, 'X']
      const gameRules = new GameRules(board.values);

      board.values = [null, null, null]
      // board.values = ref2 ref2 -> [null, null, null]

      expect(gameRules.isEmptyBoard2()).toEqual(false);
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
  describe(".validateInput", () => {
    it("Returns false if selection input is less than 1", async () => {
      expect(await GameRules.isSelectionValid(0)).toEqual(false);
    });
    it("Returns false if selection input is greater than player types length ", async () => {
      expect(
        await GameRules.isSelectionValid(GameSetup.PLAYER_TYPES.length + 2)
      ).toEqual(false);
    });
    it("Returns false if selection input is string ", async () => {
      expect(await GameRules.isSelectionValid("Z")).toEqual(false);
    });
    it("Returns true if selection input is valid(number and in the range) ", async () => {
      expect(
        await GameRules.isSelectionValid(GameSetup.PLAYER_TYPES.length)
      ).toEqual(true);
    });
  });

  describe(".checkWinnerOnRows", () => {
    it("Returns true for the winner of 2X2 board row", async () => {
      const board = ["X", "X", 2, 3];
      expect(await GameRules.checkWinnerOnRows(board, 2)).toEqual(true);
    });
    it("Returns true for the winner of 3X3 board row", async () => {
      const board = [0, 1, 2, "X","X","X",6,7,8];
      expect(await GameRules.checkWinnerOnRows(board, 3)).toEqual(true);
    });
    it("Returns true for the winner of 4X4 board row", async () => {
      const board = [0,1,2,3,"X","X","X","X",8,9,10,11,12,13,14,15,];
      expect(await GameRules.checkWinnerOnRows(board, 4)).toEqual(true);
    });
    it("Returns true for the winner of 5X5 board row", async () => {
      const board = [0,1,2,3,4,5,6,7,8,9,'X','X','X','X','X',15,16,17,18,19,20,21,22,23,24];
      expect(await GameRules.checkWinnerOnRows(board, 5)).toEqual(true); 
    });
  });

  describe(".checkWinnerOnColumns", () => {
    it("Returns true for the winner of 2X2 board columns", async () => {
      const board = ["X", 1, 2, "X", 4, 5, "X", 7, 8];
      expect(await GameRules.checkWinnerOnColumns(board, 3)).toEqual(true);
    });
    it("Returns true for the winner of 3X3 board columns", async () => {
      const board = ["X", 1, "X", 3];
      expect(await GameRules.checkWinnerOnColumns(board, 2)).toEqual(true);
    });
    it("Returns true for the winner of 4X4 board columns", async () => {
      const board = [0,1,"X",3,4,5,"X",7,8,9,"X",11,12,13,"X",15,];
      expect(await GameRules.checkWinnerOnColumns(board, 4)).toEqual(true);
    });
    it("Returns true for the winner of 5X5 board row", async () => {
      const board = [0,1,2,'X',4,5,6,7,'X',9,10,11,12,'X',14,15,16,17,'X',19,20,21,22,'X',24];
      expect(await GameRules.checkWinnerOnColumns(board, 5)).toEqual(true); 
    });
  }); 
  
  describe(".checkWinnerOnDiagonals", () => {
    it("Returns true for the winner of 3X3 board diagonals", async () => {
      const board = ["X", 1, 2, 3, "X", 5, 6, 7, "X"];
      expect(await GameRules.checkWinnerOnDiagonals(board, 3)).toEqual(true);
    });
    it("Returns true for the winner of 3X3 board diagonals", async () => {
      const board = [0, 1, "X", 3, "X", 5, "X", 7, 8];
      expect(await GameRules.checkWinnerOnDiagonals(board, 3)).toEqual(true);
    });
    it("Returns true for the winner of 2X2 board diagonals", async () => {
      const board = [0, "X", "X", 3];
      expect(await GameRules.checkWinnerOnDiagonals(board, 2)).toEqual(true);
    });
      it("Returns true for the winner of 5X5 board row", async () => {
      const board = [0,1,2,3,'X',5,6,7,'X',9,10,11,'X',13,14,15,'X',17,18,19,'X',21,22,23,24];
      expect(await GameRules.checkWinnerOnDiagonals(board, 5)).toEqual(true); 
      });
          it("Returns true for the winner of 5X5 board row", async () => {
      const board = ['X',1,2,3,4,5,'X',7,8,9,10,11,'X',13,14,15,16,17,'X',19,20,21,22,23,'X'];
      expect(await GameRules.checkWinnerOnDiagonals(board, 5)).toEqual(true); 
    });
  });
});
