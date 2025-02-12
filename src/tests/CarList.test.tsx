import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CarList from "../components/CarList";
import { CarListWithMetadata, FuelType, MileageUnit } from "../types/car";

vi.mock("../services/favouriteCarService", () => ({
  isFavouriteCar: vi.fn().mockReturnValue(false),
}));

describe("CarList component", () => {
  const mockChangePage = vi.fn();
  const mockOnCarSelect = vi.fn();

  const mockCarList: CarListWithMetadata = {
    cars: [
      {
        stockNumber: 111,
        manufacturerName: "Audi",
        modelName: "A4",
        mileage: { number: 20000, unit: MileageUnit.KM },
        fuelType: FuelType.PETROL,
        color: "black",
        pictureUrl: "http://example.com/audi.jpg",
      },
      {
        stockNumber: 222,
        manufacturerName: "BMW",
        modelName: "X5",
        mileage: { number: 30000, unit: MileageUnit.KM },
        fuelType: FuelType.DIESEL,
        color: "blue",
        pictureUrl: "http://example.com/bmw.jpg",
      },
    ],
    totalCarsCount: 2,
    totalPageCount: 1,
  };

  it("renders the list of cars correctly", () => {
    render(
      <CarList
        carListWithMetadata={mockCarList}
        currentPage={1}
        isCarListLoading={false}
        changeCurrentPage={mockChangePage}
        onCarSelect={mockOnCarSelect}
      />
    );

    expect(screen.getByText(/Available cars/i)).toBeInTheDocument();
    expect(screen.getByText("Audi A4")).toBeInTheDocument();
    expect(screen.getByText("BMW X5")).toBeInTheDocument();
  });

  it('calls onCarSelect when "View details" is clicked', () => {
    render(
      <CarList
        carListWithMetadata={mockCarList}
        currentPage={1}
        isCarListLoading={false}
        changeCurrentPage={mockChangePage}
        onCarSelect={mockOnCarSelect}
      />
    );

    const viewDetailsButtons = screen.getAllByText(/view details/i);
    fireEvent.click(viewDetailsButtons[0]);
    expect(mockOnCarSelect).toHaveBeenCalledWith(0);
  });

  it("disables navigation buttons if at first page or last page", () => {
    render(
      <CarList
        carListWithMetadata={{ ...mockCarList, totalPageCount: 1 }}
        currentPage={1}
        isCarListLoading={false}
        changeCurrentPage={mockChangePage}
        onCarSelect={mockOnCarSelect}
      />
    );

    expect(screen.getByText("First")).toBeDisabled();
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Last")).toBeDisabled();
  });

  it("calls changeCurrentPage when the pagination buttons are clicked", () => {
    render(
      <CarList
        carListWithMetadata={{ ...mockCarList, totalPageCount: 5 }}
        currentPage={2}
        isCarListLoading={false}
        changeCurrentPage={mockChangePage}
        onCarSelect={mockOnCarSelect}
      />
    );

    fireEvent.click(screen.getByText("First"));
    expect(mockChangePage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Previous"));
    expect(mockChangePage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Next"));
    expect(mockChangePage).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText("Last"));
    expect(mockChangePage).toHaveBeenCalledWith(5);
  });
});
