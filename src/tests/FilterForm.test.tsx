import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FilterForm from "../components/FilterForm";
import { Manufacturer } from "../types/car";

describe("FilterForm component", () => {
  const mockOnSubmit = vi.fn();
  const colorList = ["red", "blue", "green"];
  const manufacturerList: Manufacturer[] = [
    { name: "BMW", models: [{ name: "X1" }, { name: "X2" }] },
    { name: "Audi", models: [{ name: "A3" }, { name: "A4" }] },
    { name: "Volkswagen", models: [{ name: "Golf" }, { name: "Passat" }] },
  ];

  it("renders color and manufacturer selects", () => {
    render(
      <FilterForm
        colorList={colorList}
        manufacturerList={manufacturerList}
        currentQueryParams={{ page: 1 }}
        onSubmitFilter={mockOnSubmit}
      />
    );

    expect(screen.getByText(/All car colors/i)).toBeInTheDocument();
    expect(screen.getByText(/All Manufacturers/i)).toBeInTheDocument();
  });

  it("calls onSubmitFilter with selected color and manufacturer", async () => {
    render(
      <FilterForm
        colorList={["red", "blue", "green"]}
        manufacturerList={[
          { name: "BMW", models: [] },
          { name: "Audi", models: [] },
        ]}
        currentQueryParams={{ page: 1 }}
        onSubmitFilter={mockOnSubmit}
      />
    );

    const user = userEvent.setup();
    const colorSelect = screen.getByTestId("color-select");
    const combobox = within(colorSelect).getByRole("combobox");
    user.click(combobox);

    await waitFor(() => {
      expect(screen.getByTestId("color-select-item-blue")).toBeTruthy();
    });
    fireEvent.click(screen.getByTestId("color-select-item-blue"));

    const manufacturerSelect = screen.getByTestId("manufacturer-select");
    const manufacturerCombobox =
      within(manufacturerSelect).getByRole("combobox");
    user.click(manufacturerCombobox);

    await waitFor(() => {
      expect(screen.getByTestId("manufacturer-select-item-Audi")).toBeTruthy();
    });
    fireEvent.click(screen.getByTestId("manufacturer-select-item-Audi"));

    const submitButton = screen.getByTestId("filter-button");
    user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith("blue", "Audi");
    });
  });
});
