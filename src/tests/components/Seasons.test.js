/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { act } from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Seasons from "../../components/Seasons";
import Api from "../../services/Api";

jest.mock("../../services/Api");
jest.mock("../../components/Spinner", () => () => <div>Loading...</div>);

const mockSeasons = [
  { id: "1", name: "Season 1" },
  { id: "2", name: "Season 2" },
];

describe("Seasons tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display seasons after successful fetch", async () => {
    Api.getSeasons.mockResolvedValue({ seasons: mockSeasons });
    const setActiveSeason = jest.fn();

    await act(async () => {
      render(
        <Seasons
          setError={jest.fn()}
          loading={false}
          setLoading={jest.fn()}
          activeSeason=""
          setActiveSeason={setActiveSeason}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Competition Seasons")).toBeInTheDocument();
      expect(screen.getByText("Season 1")).toBeInTheDocument();
      expect(screen.getByText("Season 2")).toBeInTheDocument();
    });

    expect(setActiveSeason).toHaveBeenCalledWith("1");
  });

  test("should display error page if fetch fails", async () => {
    Api.getSeasons.mockRejectedValue(new Error("Fetch failed"));
    const setError = jest.fn();

    await act(async () => {
      render(
        <Seasons
          setError={setError}
          loading={false}
          setLoading={jest.fn()}
          activeSeason=""
          setActiveSeason={jest.fn()}
        />
      );
    });

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith(true);
    });
  });

  test("should set active season and trigger loading on button click", async () => {
    Api.getSeasons.mockResolvedValue({ seasons: mockSeasons });
    const setActiveSeason = jest.fn();
    const setLoading = jest.fn();

    await act(async () => {
      render(
        <Seasons
          setError={jest.fn()}
          loading={false}
          setLoading={setLoading}
          activeSeason=""
          setActiveSeason={setActiveSeason}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Season 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Season 1"));

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setActiveSeason).toHaveBeenCalledWith("1");
  });
});
