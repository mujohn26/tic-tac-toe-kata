import GameRules from "../gameRules";

export class FirstMovePlayer {
  constructor(symbol) {
    this.symbol = symbol;
  }

  getMove(boardValues) {
    const emptyIndexies = GameRules.getEmptyIndexies(boardValues);
    return emptyIndexies[0];
  }
}
