import Board from "./board";
import HumanPlayer from "./player";
import Validations from "./validations";
import Players from "./players";
import Winner from "./winner";
import Validation from "./validations";

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
    const validation = new Validation();
    this.winner = new Winner(validation.winCombinations);
  }

  async start() {
    while (!this.gameover()) {
      let moveIndex;
      const currentPlayer = this.players.getCurrentPlayer();
      // Print board with first style
      // Print board with second style

      // console.log(this.board.print());

      // Use new GameRules class here, use a more friendly method name
      while (!Validations.___isValidMove(this.board.values, moveIndex)) {
        moveIndex = await currentPlayer.getMove();
      }
      this.board.mark(moveIndex, currentPlayer.symbol);
      this.players.setNextPlayer();
    }
    const printWinner = new WinnerPrinter(
      this.winner.getWinner(this.board.values)
    );
    console.log(this.board.print());
    printWinner.winnerPrinter();
  }

  gameover() {
    return Validations.isGameOver(this.board.values);
  }
}

const game = new Game();
game.start();
