import { GameSetup } from "./game";
class GameRules {
  constructor(boardValues) {
    // boardValues = ref1
    this.boardValues = boardValues;
  }
  static WIN_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  getWinner(board) {
    for (let i = 0; i < GameRules.WIN_COMBINATIONS.length; i++) {
      const firstValue = board[GameRules.WIN_COMBINATIONS[i][0]];
      const winnerExists = GameRules.WIN_COMBINATIONS[i].every(
        (value) => board[value] === firstValue && board[value] !== null
      );
      if (winnerExists) {
        return board[GameRules.WIN_COMBINATIONS[i][0]];
      }
    }
    return null;
  }

  static isValidMove(board, index) {
    if (isNaN(index)) {
      return false;
    }
    if (index > 9 || index < 0) {
      return false;
    }
    if (board[index] !== null) {
      return false;
    }

    return true;
  }
  
  isEmptyBoard2() {
    
    return this.boardValues.every((value) => {
      return value === null;
    });
  }

  static isEmptyBoard(board) {
    return board.every((value) => {
      return value === null;
    });
  }

  static isGameOver(board) {
    const gameRules = new GameRules();
    if (this.isEmptyBoard(board)) {
      return false;
    }

    if (
      board.every((value) => {
        return value !== null;
      })
    ) {
      return true;
    }

    if (gameRules.getWinner(board)) {
      return true;
    }
    return false;
  }

  static getEmptyIndexies(boadValues) {
    return boadValues.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  static getAiWinner(boardValues, player) {
    for (let i = 0; i < GameRules.WIN_COMBINATIONS.length; i++) {
      const winnerExists = GameRules.WIN_COMBINATIONS[i].every(
        (value) => boardValues[value] === player
      );
      if (winnerExists) {
        return true;
      }
    }
    return false;
  }

  static async isSelectionValid(input) {
    if (input < 1) {
      return false;
    } else if (input > GameSetup.PLAYER_TYPES.length) {
      return false;
    } else if (isNaN(input)) {
      return false;
    }
    return true;
  }

  static async checkWinnerOnRows(boardValues, gameSize) {
    const boardChunks = await GameRules.chunkBoardInGroups(
      boardValues,
      gameSize
    );
    for (let i = 0; i < boardChunks.length; i++) {
      let counter = 0;
      for (let j = 0; j < boardChunks[i].length; j++) {
        if (boardChunks[i][0] === boardChunks[i][j]) {
          counter++;
        }
      }
      if (counter === gameSize) {
        return true;
      }
    }

    return false;
  }

  static async checkWinnerOnColumns(boardValues, gameSize) {
    const boardChunks = await GameRules.chunkBoardInGroups(
      boardValues,
      gameSize
    );

    for (let i = 0; i < boardChunks.length; i++) {
      let counter = 0;
      for (let j = 0; j < boardChunks.length; j++) {
        if (boardChunks[0][i] === boardChunks[j][i]) {
          counter++;
        }
      }
      if (counter === gameSize) {
        return true;
      }
    }
    return false;
  }

  static async checkWinnerOnDiagonals(boardValues, gameType) {
    const boardChunks = await GameRules.chunkBoardInGroups(
      boardValues,
      gameType
    );

    let isWinner = false;
    for (let i = 0; i < boardChunks.length; i++) {
      if (boardChunks[0][0] === boardChunks[i][i]) {
        isWinner = true;
      } else {
        isWinner = false;
      }
    }

    if (isWinner) {
      return true;
    }

    let length = boardChunks.length - 1;
    for (let i = 0; i < boardChunks.length; i++) {
      if (boardChunks[0][boardChunks.length - 1] === boardChunks[i][length]) {
        isWinner = true;
      } else {
        isWinner = false;
      }
      length = length - 1;
    }

    if (isWinner) {
      return true;
    }

    return false;
  }

  static async chunkBoardInGroups(boardValues, size) {
    var boardValuesData = [];
    for (let i = 0; i < boardValues.length; i += size) {
      boardValuesData.push(boardValues.slice(i, i + size));
    }
    return boardValuesData;
  }
}

export default GameRules;
