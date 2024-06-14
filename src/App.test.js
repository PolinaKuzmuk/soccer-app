import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App tests", () => {
  test("should render Seasons component at root path", () => {
    render(<App />);

    expect(screen.getByText(/Competition Seasons/)).toBeInTheDocument();
  });
});
