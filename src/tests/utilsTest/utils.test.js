import utils from "../../utils/utils";

describe("Utils tests", () => {
  test("should define home team name", () => {
    const competitors = [
      {
        id: "sr:competitor:7",
        name: "Crystal Palace",
        country: "England",
        country_code: "ENG",
        abbreviation: "CRY",
        qualifier: "home",
        gender: "male",
      },
      {
        id: "sr:competitor:42",
        name: "Arsenal FC",
        country: "England",
        country_code: "ENG",
        abbreviation: "ARS",
        qualifier: "away",
        gender: "male",
      },
    ];
    const expectedTeamName = "Crystal Palace";

    const result = utils.defineHomeAwayTeam(competitors, "home");

    expect(result).toBe(expectedTeamName);
  });

  test("should define away team name", () => {
    const competitors = [
      {
        id: "sr:competitor:7",
        name: "Crystal Palace",
        country: "England",
        country_code: "ENG",
        abbreviation: "CRY",
        qualifier: "home",
        gender: "male",
      },
      {
        id: "sr:competitor:42",
        name: "Arsenal FC",
        country: "England",
        country_code: "ENG",
        abbreviation: "ARS",
        qualifier: "away",
        gender: "male",
      },
    ];
    const expectedTeamName = "Arsenal FC";

    const result = utils.defineHomeAwayTeam(competitors, "away");

    expect(result).toBe(expectedTeamName);
  });

  test("should set background color to the fistTeam to red if it lost", () => {
    const firstTeamScore = 1;
    const secondTeamScore = 2;

    const definedBackgroundColor = utils.getBackgroundColor(
      firstTeamScore,
      secondTeamScore
    );

    expect(definedBackgroundColor).toBe("red");
  });

  test("should set background color to the fistTeam to green if it won", () => {
    const firstTeamScore = 2;
    const secondTeamScore = 1;

    const definedBackgroundColor = utils.getBackgroundColor(
      firstTeamScore,
      secondTeamScore
    );

    expect(definedBackgroundColor).toBe("green");
  });

  test("should set background color to the fistTeam to orange if it's a draw", () => {
    const firstTeamScore = 2;
    const secondTeamScore = 2;

    const definedBackgroundColor = utils.getBackgroundColor(
      firstTeamScore,
      secondTeamScore
    );

    expect(definedBackgroundColor).toBe("orange");
  });

  test("should not change background color to the fistTeam if the firstTeamScore is undefined", () => {
    const firstTeamScore = undefined;
    const secondTeamScore = 2;

    const definedBackgroundColor = utils.getBackgroundColor(
      firstTeamScore,
      secondTeamScore
    );

    expect(definedBackgroundColor).toBe("inherit");
  });

  test("should extract match ID from given string", () => {
    const givenString = "sr:sport_event:34004457";

    const extractedMatchId = utils.extractMatchId(givenString);

    expect(extractedMatchId).toBe("34004457");
  });

  test("should reload the page", () => {
    delete window.location;
    window.location = { reload: jest.fn() };

    utils.refreshPage();

    expect(window.location.reload).toHaveBeenCalled();
  });
});
