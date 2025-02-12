import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PanelHost from "../pages/PanelHost";

describe("PanelHost component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders car list when fetch is successful", async () => {
    const mockColors = { colors: ["red", "blue"] };
    const mockManufacturers = {
      manufacturers: [{ name: "BMW" }, { name: "Audi" }],
    };
    const mockCarList = {
      cars: [
        {
          stockNumber: 123,
          manufacturerName: "BMW",
          modelName: "X5",
          mileage: { number: 5000, unit: "km" },
          fuelType: "Petrol",
          color: "red",
          pictureUrl: "http://example.com/car.jpg",
        },
      ],
      totalCarsCount: 1,
      totalPageCount: 1,
    };

    (global.fetch as any) = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockColors),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockManufacturers),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCarList),
      });

    render(<PanelHost />);

    await waitFor(() => {
      expect(screen.getByText(/Available cars/i)).toBeInTheDocument();
      expect(screen.getByText(/BMW X5/i)).toBeInTheDocument();
    });
  });

  it("renders error message when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<PanelHost />);

    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });
});
