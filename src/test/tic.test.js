import SetupTests from '../index';

describe("Tic tac toe tests", () => {
  it("Tests should pass", () => {
    expect(SetupTests(3)).toEqual(3);
  });
});
