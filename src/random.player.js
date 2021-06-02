import { random } from "underscore";
import GameRules from "./game.rules";

export class RandomPlayer {
  constructor(player) {
    this.symbol = player;
  }

  async getMove(boardValues) {
    return RandomPlayer.getRandomIndex(boardValues);
  }

  static getRandomIndex(boardValues) {
    const emptyIndexies = GameRules.getEmptyIndexies(boardValues);
    return emptyIndexies[Math.floor(Math.random() * emptyIndexies.length)];
  }
}
