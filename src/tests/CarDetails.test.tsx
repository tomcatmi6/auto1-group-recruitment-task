import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CarDetails from "../components/CarDetails";
import {
  addFavouriteCar,
  removeFavouriteCar,
  isFavouriteCar,
} from "../services/favouriteCarService";
import { Car, FuelType, MileageUnit } from "../types/car";

vi.mock("../services/favouriteCarService", () => ({
  addFavouriteCar: vi.fn(),
  removeFavouriteCar: vi.fn(),
  isFavouriteCar: vi.fn(),
}));

describe("CarDetails component", () => {
  const mockCar: Car = {
    stockNumber: 1234,
    manufacturerName: "BMW",
    modelName: "X1",
    mileage: { number: 10000, unit: MileageUnit.KM },
    fuelType: FuelType.PETROL,
    color: "blue",
    pictureUrl: "http://example.com/car.jpg",
  };

  it('calls onDetailsClose when clicking "Close" button', () => {
    const mockOnClose = vi.fn();

    (isFavouriteCar as Mock).mockReturnValue(false);

    render(<CarDetails car={mockCar} onDetailsClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('shows "Save" if car is not favourite initially', () => {
    (isFavouriteCar as unknown as Mock).mockReturnValue(false);

    render(<CarDetails car={mockCar} onDetailsClose={vi.fn()} />);
    expect(screen.getByTestId("favourite-button")).toHaveTextContent(/save/i);
  });

  it('shows "Remove" if car is favourite initially', () => {
    (isFavouriteCar as unknown as Mock).mockReturnValue(true);

    render(<CarDetails car={mockCar} onDetailsClose={vi.fn()} />);
    expect(screen.getByTestId("favourite-button")).toHaveTextContent(/remove/i);
  });

  it('adds car to favourites if "Save" is clicked', () => {
    (isFavouriteCar as unknown as Mock).mockReturnValue(false);

    render(<CarDetails car={mockCar} onDetailsClose={vi.fn()} />);
    const saveButton = screen.getByTestId("favourite-button");
    fireEvent.click(saveButton);

    expect(addFavouriteCar).toHaveBeenCalledWith(mockCar);
  });

  it('removes car from favourites if "Remove" is clicked', () => {
    (isFavouriteCar as unknown as Mock).mockReturnValue(true);

    render(<CarDetails car={mockCar} onDetailsClose={vi.fn()} />);
    const removeButton = screen.getByTestId("favourite-button");
    fireEvent.click(removeButton);

    expect(removeFavouriteCar).toHaveBeenCalledWith(
      mockCar.manufacturerName,
      mockCar.stockNumber
    );
  });
});
