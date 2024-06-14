import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DetailedMatchInfo from "../../components/DetailedMatchInfo";
import utils from "../../utils/utils";

jest.mock("../../utils/utils");

const mockMatchInfo = {
  sport_event: {
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
  },
  timeline: [
    {
      id: 1248131083,
      type: "match_started",
      time: "2022-09-04T13:00:36+00:00",
    },
    {
      id: 1248131081,
      type: "period_start",
      time: "2022-09-04T13:00:36+00:00",
      period: 1,
      period_type: "regular_period",
      period_name: "regular_period",
    },
    {
      id: 1248131935,
      type: "yellow_card",
      time: "2022-09-04T13:01:10+00:00",
      match_time: 1,
      match_clock: "0:51",
      competitor: "home",
      period: 1,
      period_type: "regular_period",
    },
  ],
};

describe("DetailedMatchInfo tests", () => {
  beforeEach(() => {
    utils.defineHomeAwayTeam.mockImplementation((competitors, qualifier) => {
      return competitors.find((team) => team.qualifier === qualifier).name;
    });
  });

  test("should render correctly", () => {
    render(<DetailedMatchInfo matchInfo={mockMatchInfo} />);

    expect(screen.getByText("Detailed information")).toBeInTheDocument();
  });

  test("should display filtered timeline events", () => {
    render(<DetailedMatchInfo matchInfo={mockMatchInfo} />);

    expect(screen.getByText("13:00:36")).toBeInTheDocument();
    expect(screen.getByText("match started")).toBeInTheDocument();

    expect(screen.getByText("13:01:10")).toBeInTheDocument();
    expect(screen.getByText("yellow card")).toBeInTheDocument();
    expect(screen.getByText("Crystal Palace")).toBeInTheDocument();
  });
});
