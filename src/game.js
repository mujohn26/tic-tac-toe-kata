import { Board, BoardPrinter } from "./board";
import HumanPlayer from "./player/humanPlayer";
import GameRules from "./gameRules";
import prompt from "prompt";
import Players from "./players";
import { AiPlayer } from "./player/aiPlayer";
import { RandomPlayer } from "./player/randomPlayer";
import { WinnerPrinter } from "./winnerPrinter";
import { FirstMovePlayer } from "./player/firstMovePlayer";

export class GameSetup {
  static PLAYER_TYPES = [
    { name: "Human", className: HumanPlayer },
    { name: "AI", className: AiPlayer },
    { name: "Random", className: RandomPlayer },
    { name: "First Move", className: FirstMovePlayer },
  ];
  constructor(prompt) {
    this.prompt = prompt;
  }

  async getPlayerSelection(symbol) {
    console.log(`Please select player ${symbol}`);
    console.log(`Select\n`);
    for (let i = 0; i < GameSetup.PLAYER_TYPES.length; i++) {
      console.log(`${i + 1}.${GameSetup.PLAYER_TYPES[i].name}`);
    }
    const { [symbol]: selection } = await this.prompt.get([symbol]);

    return selection;
  }
  async getPlayer(symbol) {
    const playerSelection = parseInt(await this.getPlayerSelection(symbol));
    return new GameSetup.PLAYER_TYPES[playerSelection - 1].className(symbol);
  }
  async getPlayers() {
    const players = new Players([
      await this.getPlayer("X"),
      await this.getPlayer("O"),
    ]);
    return players;
  }
}

export class Game {
  constructor() {
    this.board = new Board();
    this.gameSetup = new GameSetup(prompt);
    this.gameRules = new GameRules();
    this.dashPrinter = new BoardPrinter({ emptyMark: "-" });
    this.numberPrinter = new BoardPrinter({ emptyMark: "number" });
  }

  printCurrentBoardState() {
    console.log(this.numberPrinter.printer(this.board.values));
    console.log(this.dashPrinter.printer(this.board.values));
  }

  async start() {
    const players = await this.gameSetup.getPlayers();

    while (!this.gameover()) {
      let moveIndex;
      let currentPlayer = players.getCurrentPlayer();
      this.printCurrentBoardState();
      // Use new GameRules class here, use a more friendly method name
      while (!GameRules.isValidMove(this.board.values, moveIndex)) {
        moveIndex = await currentPlayer.getMove(
          this.board.values,
          currentPlayer.symbol
        );
      }
      const symbol = currentPlayer.symbol;

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
