import prompt from "prompt";
import Board from "./board";
import Validation from "./validations";

class HumanPlayer {
  constructor(symbol) {
    this.symbol = symbol;
  }
  async getMove() {
    console.log("Its your turn player:", this.symbol);
    const { position } = await prompt.get(["position"]);

    return position;
  }
}

export default HumanPlayer;
