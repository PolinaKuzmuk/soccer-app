import React from "react";
import { render, screen } from "@testing-library/react";
import SummaryMatchInfo from "../../components/SummaryMatchInfo";

const mockMatchInfo = {
  sport_event: {
    sport_event_context: {
      competition: { name: "Premier League" },
    },
    venue: {
      name: "Allianz",
      city_name: "Manchester",
      country_name: "England",
    },
    competitors: [
      {
        id: "1",
        qualifier: "home",
        name: "Manchester United",
        country: "England",
        abbreviation: "MUN",
      },
      {
        id: "2",
        qualifier: "away",
        name: "Liverpool",
        country: "Germany",
        abbreviation: "LIV",
      },
    ],
  },
  sport_event_status: {
    home_score: 2,
    away_score: 1,
  },
};

describe("SummaryMatchInfo tests", () => {
  test("should render the match information correctly", () => {
    render(<SummaryMatchInfo matchInfo={mockMatchInfo} />);

    expect(screen.getByText("Match Info")).toBeInTheDocument();
    expect(screen.getByText("Premier League")).toBeInTheDocument();
    expect(screen.getByText("Allianz Stadium")).toBeInTheDocument();
    expect(screen.getByText("Manchester, England")).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("Manchester United")).toBeInTheDocument();
    expect(screen.getByText("England")).toBeInTheDocument();
    expect(screen.getByText("MUN")).toBeInTheDocument();
    expect(screen.getByText("away")).toBeInTheDocument();
    expect(screen.getByText("Liverpool")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("LIV")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
    expect(screen.getByText("2 - 1")).toBeInTheDocument();
  });

  test("should sort competitors correctly", () => {
    render(<SummaryMatchInfo matchInfo={mockMatchInfo} />);

    const competitors = screen.getAllByText(/home|away/);
    expect(competitors[0]).toHaveTextContent("home");
    expect(competitors[1]).toHaveTextContent("away");
  });
});
