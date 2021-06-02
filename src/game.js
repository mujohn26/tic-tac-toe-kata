import { Board, BoardPrinter } from "./board";
import HumanPlayer from "./player";
import GameRules from "./game.rules";
import prompt from "prompt";
import Players from "./players";
import { AiPlayer } from "./ai.player";
import { RandomPlayer } from "./random.player";
import { WinnerPrinter } from "./winnerPrinter";

export class GameSetup {
  constructor(prompt) {
    // this === gameSetup (instance)
    this.prompt = prompt;
  }
  
  async getPlayerSelection(symbol) {
    console.log(`Please select player ${symbol}`);
    console.log("Select\n 1: Human \n 2: AI \n 3. Random");
    const { [symbol]: selection } = await this.prompt.get([symbol]);

    return selection;
  }
  async getPlayer(symbol) {
    const playerSelection = await this.getPlayerSelection(symbol);
    if (playerSelection === "1") {
      return new HumanPlayer(symbol);
    } else if(playerSelection === "2") {
      return new AiPlayer(symbol);
    }
    else {
      return new RandomPlayer(symbol);
    }
  }
  async getPlayers() {
    const players =  new Players([await this.getPlayer("X"), await this.getPlayer("O")]);
    return players
  }

}

export class Game {
  constructor() {
    this.board = new Board();
    this.gameSetup =  new GameSetup(prompt)
    this.gameRules = new GameRules();
    this.dashPrinter = new BoardPrinter({ emptyMark: "-" });
    this.numberPrinter = new BoardPrinter({ emptyMark: "number" });
  }

  printCurrentBoardState() {
    console.log(this.numberPrinter.printer(this.board.values));
    console.log(this.dashPrinter.printer(this.board.values));
  }

  async start() {
  
    const players = await this.gameSetup.getPlayers()

    while (!this.gameover()) {
      let moveIndex;
      let currentPlayer = players.getCurrentPlayer();
      this.printCurrentBoardState();
      // Use new GameRules class here, use a more friendly method name
      while (!GameRules.isValidMove(this.board.values, moveIndex)) {
        moveIndex = await currentPlayer.getMove(this.board.values, currentPlayer.symbol);
      }
      const symbol = currentPlayer.symbol

      this.board.mark(moveIndex, symbol);
      players.setNextPlayer();
    }
    const printWinner = new WinnerPrinter(
      this.gameRules.getWinner(this.board.values)
    );
    this.printCurrentBoardState();
    printWinner.winnerPrinter();
  }

  gameover() {
    return GameRules.isGameOver(this.board.values);
  }
}
