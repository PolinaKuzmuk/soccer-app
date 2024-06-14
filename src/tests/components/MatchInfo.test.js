/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MatchInfo from "../../components/MatchInfo";
import Api from "../../services/Api";

jest.mock("../../services/Api");
jest.mock("../../components/Spinner", () => () => <div>Loading...</div>);
jest.mock("../../components/SummaryMatchInfo", () => ({ matchInfo }) => (
  <div>Summary: {matchInfo.summary}</div>
));
jest.mock("../../components/DetailedMatchInfo", () => ({ matchInfo }) => (
  <div>Detailed: {matchInfo.detailed}</div>
));
jest.mock("../../components/ErrorPage", () => () => <div>Error!</div>);

const matchId = "12345";
const mockMatchInfo = {
  summary: "Match Summary",
  detailed: "Match Details",
};

describe("MatchInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const url = `?id=${matchId}`;
    window.history.pushState({}, "Test Page", url);
  });

  test("should display the loading spinner initially", async () => {
    Api.getMatchInfo.mockResolvedValue(mockMatchInfo);

    render(<MatchInfo />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should display match info after successful fetch", async () => {
    Api.getMatchInfo.mockResolvedValue(mockMatchInfo);

    await act(async () => {
      render(<MatchInfo />);
    });

    await waitFor(() => {
      expect(screen.getByText("Summary: Match Summary")).toBeInTheDocument();
      expect(screen.getByText("Detailed: Match Details")).toBeInTheDocument();
    });
  });

  test("should display error page if fetch fails", async () => {
    Api.getMatchInfo.mockRejectedValue(new Error("Fetch failed"));

    await act(async () => {
      render(<MatchInfo />);
    });

    await waitFor(() => {
      expect(screen.getByText("Error!")).toBeInTheDocument();
    });
  });
});
