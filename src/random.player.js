import GameRules from "./game.rules";

export class RandomPlayer {
  constructor(symbol) {
    this.symbol = symbol;
  }

  getMove(boardValues) {
    const emptyIndexies = GameRules.getEmptyIndexies(boardValues);
    return emptyIndexies[Math.floor(Math.random() * emptyIndexies.length)];
  }

}
