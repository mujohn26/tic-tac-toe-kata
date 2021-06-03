import { GameSetup } from "./game";
import HumanPlayer from "./player/humanPlayer";
import { AiPlayer } from "./player/aiPlayer";
import Players from "./players";
import { values } from "underscore";

describe("Game", () => {
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  afterAll(() => {
    console.log = log; // restore original console.log after all tests
  });

  function createPrompt(message) {
    return {
      get: jest.fn(([promptMessage]) => {
        return { [promptMessage]: message };
      }),
    };
  }

  describe("#getPlayerSelection", () => {
    it("returns 1 when user selection is 1", async () => {
      const prompt = createPrompt("1");

      const gameSetup = new GameSetup(prompt);
      const selection = await gameSetup.getPlayerSelection("X");

      expect(selection).toEqual("1");
    });

    it("returns 2 when user selection is 2", async () => {
      const prompt = createPrompt("2");

      const gameSetup = new GameSetup(prompt);
      const selection = await gameSetup.getPlayerSelection("X");

      expect(selection).toEqual("2");
    });

    it("prompts the user to select player X", async () => {
      const prompt = {
        get: jest.fn(([promptMessage]) => {
          return { [promptMessage]: "1" };
        }),
      };

      const gameSetup = new GameSetup(prompt);
      const selection = await gameSetup.getPlayerSelection("X");

      expect(console.log).toHaveBeenCalledWith("Please select player X");
      expect(selection).toEqual("1");
    });

    it("prompts the user to select player O", async () => {
      const prompt = {
        get: jest.fn(([promptMessage]) => {
          return { [promptMessage]: "1" };
        }),
      };

      const gameSetup = new GameSetup(prompt);
      const selection = await gameSetup.getPlayerSelection("O");

      expect(console.log).toHaveBeenCalledWith("Please select player O");
      expect(selection).toEqual("1");
    });

    it("gives instructions for which value to type in", async () => {
      const prompt = {
        get: jest.fn(([promptMessage]) => {
          return { [promptMessage]: "1" };
        }),
      };

      const gameSetup = new GameSetup(prompt);
      const selection = await gameSetup.getPlayerSelection("O");
      GameSetup.PLAYER_TYPES.forEach((value, index) => {
        expect(console.log).toHaveBeenCalledWith(`${index + 1}.${value.name}`);
      });
      expect(selection).toEqual("1");
    });
  });

  describe("#getPlayer", () => {
    it("returns an instance of HumanPlayer when user input is 1", async () => {
      const prompt = {
        get: ([promptMessage]) => {
          return { [promptMessage]: "1" };
        },
      };
      const gameSetup = new GameSetup(prompt);
      const player = await gameSetup.getPlayer("X");

      expect(player).toBeInstanceOf(HumanPlayer);
      expect(player.symbol).toEqual("X");
    });

    it("returns an instance of AiPlayer when user input is 2", async () => {
      const prompt = {
        get: ([promptMessage]) => {
          return { [promptMessage]: "2" };
        },
      };
      const gameSetup = new GameSetup(prompt);
      const player = await gameSetup.getPlayer("O");

      expect(player).toBeInstanceOf(AiPlayer);
      expect(player.symbol).toEqual("O");
    });

    it("returns an instance of AiPlayer with X symbol when user input is 2", async () => {
      const prompt = {
        get: ([promptMessage]) => {
          return { [promptMessage]: "2" };
        },
      };
      const gameSetup = new GameSetup(prompt);
      const player = await gameSetup.getPlayer("X");

      expect(player).toBeInstanceOf(AiPlayer);
      expect(player.symbol).toEqual("X");
    });
  });

  describe(".getPlayes", () => {
    it("Returns instance of players", async () => {
      const prompt = {
        get: ([promptMessage]) => {
          return { [promptMessage]: "2" };
        },
      };
      const gameSetup = new GameSetup(prompt);
      const players = await gameSetup.getPlayers();
      expect(players).toBeInstanceOf(Players);
      expect(players).toEqual({
        currentIndex: 0,
        players: [{ symbol: "X" }, { symbol: "O" }],
      });
    });
  });
});
