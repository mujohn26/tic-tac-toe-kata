export class WinnerPrinter {
  constructor(winner) {
    this.winner = winner;
  }
  winnerPrinter() {
    console.log(
      this.winner === null ? "Its a Draw" : `${this.winner} has won.`
    );
  }
}
