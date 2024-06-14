import Api from "../../services/Api";

const API_KEY = "V4orMZT4JbPtocUXyJB48nteTrfQn0R2f6FmiGQg";
const BASE_URL = "/api/soccer/trial/v4/en";

global.fetch = jest.fn();

describe("fetchApi function tests", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("should fetch data successfully", async () => {
    const mockResponse = { data: "mockData" };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await Api.getSeasons();
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/competitions/sr%3Acompetition%3A7/seasons.json?api_key=${API_KEY}`,
      expect.objectContaining({
        method: "GET",
        headers: { accept: "application/json" },
      })
    );
  });

  test("should throw an error for a failed fetch", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(Api.getSeasons()).rejects.toThrow("HTTP error! Status: 500");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should catch and throw a fetch error", async () => {
    const mockError = new Error("Network error");
    fetch.mockRejectedValue(mockError);

    await expect(Api.getSeasons()).rejects.toThrow("Network error");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("Api methods tests", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("should call getSoccerResults with the correct URL", async () => {
    const mockResponse = { data: "mockData" };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const season = "sr:season:83706";
    const data = await Api.getSoccerResults(season);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/seasons/${season}/schedules.json?api_key=${API_KEY}`,
      expect.objectContaining({
        method: "GET",
        headers: { accept: "application/json" },
      })
    );
  });

  test("should call getMatchInfo with the correct URL", async () => {
    const mockResponse = { data: "mockData" };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const matchId = "12345";
    const data = await Api.getMatchInfo(matchId);
    expect(data).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/sport_events/sr%3Asport_event%3A${matchId}/timeline.json?api_key=${API_KEY}`,
      expect.objectContaining({
        method: "GET",
        headers: { accept: "application/json" },
      })
    );
  });
});
