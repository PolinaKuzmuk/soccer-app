/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Results from "../../components/Results";
import Api from "../../services/Api";
import utils from "../../utils/utils";

jest.mock("../../services/Api");
jest.mock("../../utils/utils", () => ({
  defineHomeAwayTeam: jest.fn(),
  extractMatchId: jest.fn(),
  getBackgroundColor: jest.fn(),
}));
jest.mock("../../components/Spinner", () => () => <div>Loading...</div>);

const mockResults = [
  {
    sport_event: {
      id: "1",
      competitors: [
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
      ],
      start_time: "2023-06-14T14:00:00Z",
      venue: { name: "Big Stadium" },
    },
    sport_event_status: {
      home_score: 2,
      away_score: 1,
      period_scores: [
        { home_score: 1, away_score: 0 },
        { home_score: 1, away_score: 1 },
      ],
    },
  },
];

describe("Result tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display the loading spinner initially", async () => {
    Api.getSoccerResults.mockResolvedValue({ schedules: mockResults });

    render(
      <Results
        setError={jest.fn()}
        loading={true}
        setLoading={jest.fn()}
        results={[]}
        setResults={jest.fn()}
        activeSeason="2023"
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should display results after successful fetch", async () => {
    Api.getSoccerResults.mockResolvedValue({ schedules: mockResults });
    utils.defineHomeAwayTeam.mockImplementation((competitors, qualifier) => {
      return competitors.find((c) => c.qualifier === qualifier).name;
    });
    utils.extractMatchId.mockReturnValue("1");
    utils.getBackgroundColor.mockReturnValue("white");

    let setResults;
    await act(async () => {
      setResults = jest.fn();
      render(
        <Results
          setError={jest.fn()}
          loading={false}
          setLoading={jest.fn()}
          results={mockResults}
          setResults={setResults}
          activeSeason="2023"
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Soccer Results")).toBeInTheDocument();
      expect(screen.getByText("Crystal Palace")).toBeInTheDocument();
      expect(screen.getByText("Arsenal FC")).toBeInTheDocument();
      expect(screen.getByText("2 - 1")).toBeInTheDocument();
      expect(screen.getByText("14/06/2023")).toBeInTheDocument();
      expect(screen.getByText("1 - 0 | 1 - 1")).toBeInTheDocument();
      expect(screen.getByText("Big Stadium")).toBeInTheDocument();
    });
  });

  test("should display error page if fetch fails", async () => {
    Api.getSoccerResults.mockRejectedValue(new Error("Fetch failed"));
    const setError = jest.fn();

    await act(async () => {
      render(
        <Results
          setError={setError}
          loading={false}
          setLoading={jest.fn()}
          results={[]}
          setResults={jest.fn()}
          activeSeason="2023"
        />
      );
    });

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith(true);
    });
  });
});
