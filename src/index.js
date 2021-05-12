import Board from "./board";
import HumanPlayer from "./player";
import Validations from "./validations";
import Players from "./players";

class WinnerPrinter {
  constructor(winner) {
    this.winner = winner;
  }
  winnerPrinter() {
    console.log(`${this.winner.symbol} has won.`);
  }
}
export class Game {
  constructor() {
    this.board = new Board();
    this.playerX = new HumanPlayer("X");
    this.playerO = new HumanPlayer("O");
    this.players = new Players([this.playerX, this.playerO]);
  }

  async start() {
    while (!this.gameover()) {
      let moveIndex;
      const currentPlayer = this.players.getCurrentPlayer();
      console.log(this.board.print());
      while (!Validations.___isValidMove(this.board, moveIndex)) {
        moveIndex = await currentPlayer.getMove();
      }

      this.board.mark(moveIndex, currentPlayer.symbol);
      this.players.setNextPlayer();
    }

    const printWinner = new WinnerPrinter(this.players.getCurrentPlayer());
    printWinner.winnerPrinter();
  }

  gameover() {
    return Validations.isGameOver(
      this.board.values,
      this.players.getCurrentPlayer()
    );
  }
}

const game = new Game();
game.start();
