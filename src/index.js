import { Board, BoardPrinter } from "./board";
import HumanPlayer from "./player";
import GameRules from "./game.rules";
import Players from "./players";

class WinnerPrinter {
  constructor(winner) {
    this.winner = winner;
  }
  winnerPrinter() {
    console.log(
      this.winner === null ? "Its a Draw" : `${this.winner} has won.`
    );
  }
}
export class Game {
  constructor() {
    this.board = new Board();
    this.playerX = new HumanPlayer("X");
    this.playerO = new HumanPlayer("O");
    this.players = new Players([this.playerX, this.playerO]);
    this.gameRules = new GameRules();
    this.boardPrinter = new BoardPrinter();
  }

  async start() {
    while (!this.gameover()) {
      let moveIndex;
      const currentPlayer = this.players.getCurrentPlayer();
      // Print board with first style
      console.log(this.boardPrinter.printer("", this.board.values,'number'));
      // Print board with second style
     console.log(this.boardPrinter.printer('-', this.board.values))

      // Use new GameRules class here, use a more friendly method name
      while (!GameRules.isValidMove(this.board.values, moveIndex)) {
        moveIndex = await currentPlayer.getMove();
      }
      this.board.mark(moveIndex, currentPlayer.symbol);
      this.players.setNextPlayer();
    }
    const printWinner = new WinnerPrinter(
      this.gameRules.getWinner(this.board.values)
    );
    console.log(this.boardPrinter.printer("-", this.board.values));
    printWinner.winnerPrinter();
  }

  gameover() {
    return GameRules.isGameOver(this.board.values);
  }
}

const game = new Game();
game.start();
