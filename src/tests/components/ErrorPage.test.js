import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorPage from "../../components/ErrorPage";
import utils from "../../utils/utils";

jest.mock("../../utils/utils");

describe("ErrorPage tests", () => {
  test("should render correctly", () => {
    render(<ErrorPage />);

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Try again/i })
    ).toBeInTheDocument();
  });

  test("should call utils.refreshPage on a button click", () => {
    render(<ErrorPage />);
    const button = screen.getByRole("button", { name: /Try again/i });

    fireEvent.click(button);

    expect(utils.refreshPage).toHaveBeenCalled();
  });
});
