import Players from "./players";
import Player from './player';

describe("Players", () => {
  it("returns current player", () => {
    const players = new Players(["X", "O"]);
    expect(players.getCurrentPlayer()).toEqual("X");
  });

  it("set next player 0", () => {
    const players = new Players(["X", "O"]);
    players.setNextPlayer();
    expect(players.getCurrentPlayer()).toEqual("O");
  });

  it("set next player X", () => {
    const players = new Players(["X", "O"]);
    players.setNextPlayer();
    players.setNextPlayer();

    expect(players.getCurrentPlayer()).toEqual("X");
  });
});
