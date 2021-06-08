import GameRules from "../gameRules";

export class AiPlayer {
  constructor(player) {
    this.symbol = player;
  }
  static AI_PLAYER;
  static HUMAN_PLAYER;
  async getMove(boardValues, player) {
    AiPlayer.AI_PLAYER = player;
    AiPlayer.HUMAN_PLAYER = player === "O" ? "X" : "O";
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < boardValues.length; i++) {
      if (boardValues[i] === null) {
        boardValues[i] = player;
        // board.mark(player, i)
        // board.undoLastMove();
        let score = await this.minMax(boardValues, false);
        boardValues[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  async minMax(boardValues, isMaxmizing) {
    const availableMove = GameRules.getEmptyIndexies(boardValues);
    if (GameRules.getAiWinner(boardValues, AiPlayer.AI_PLAYER)) {
      return 10;
    } else if (GameRules.getAiWinner(boardValues, AiPlayer.HUMAN_PLAYER)) {
      return -10;
    } else if (availableMove.length === 0) {
      return 0;
    }

    if (isMaxmizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < boardValues.length; i++) {
        if (boardValues[i] === null) {
          boardValues[i] = AiPlayer.AI_PLAYER;
          let score = await this.minMax(boardValues, false);
          boardValues[i] = null;
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < boardValues.length; i++) {
        
        if (boardValues[i] === null) {
          boardValues[i] = AiPlayer.HUMAN_PLAYER;
          let score = await this.minMax(boardValues, true);
          boardValues[i] = null;
          if (score < bestScore) {
            bestScore = score;
          }
        }
      }

      return bestScore;
    }
  }
}
