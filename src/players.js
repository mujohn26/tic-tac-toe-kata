export default class Players {
  constructor(players, type) {
    this.players = players;
    this.currentIndex = 0;
    
  }

  getCurrentPlayer() {
    return this.players[this.currentIndex];
  }

  setNextPlayer() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.players.length - 1) {
      this.currentIndex = this.currentIndex - this.players.length;
    }
  }
}
