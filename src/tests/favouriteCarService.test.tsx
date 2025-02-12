import { describe, it, expect, beforeEach } from "vitest";
import {
  getFavouriteCars,
  addFavouriteCar,
  removeFavouriteCar,
  isFavouriteCar,
} from "../services/favouriteCarService";
import { Car, FuelType, MileageUnit } from "../types/car";

describe("favouriteCarService", () => {
  const mockCar: Car = {
    stockNumber: 123,
    manufacturerName: "Audi",
    modelName: "A4",
    mileage: { number: 20000, unit: MileageUnit.KM },
    fuelType: FuelType.PETROL,
    color: "black",
    pictureUrl: "http://example.com/audi.jpg",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array if no cars in localStorage", () => {
    expect(getFavouriteCars()).toEqual([]);
  });

  it("adds a car to favourites if it does not already exist", () => {
    addFavouriteCar(mockCar);
    const favourites = getFavouriteCars();
    expect(favourites).toHaveLength(1);
    expect(favourites[0]).toEqual(mockCar);
  });

  it("does not add a car that is already in favourites", () => {
    addFavouriteCar(mockCar);
    addFavouriteCar(mockCar);
    const favourites = getFavouriteCars();
    expect(favourites).toHaveLength(1);
  });

  it("removes a car from favourites if it exists", () => {
    addFavouriteCar(mockCar);
    removeFavouriteCar(mockCar.manufacturerName, mockCar.stockNumber);

    const favourites = getFavouriteCars();
    expect(favourites).toHaveLength(0);
  });

  it("checks if a car is in favourites", () => {
    addFavouriteCar(mockCar);
    expect(isFavouriteCar(mockCar.manufacturerName, mockCar.stockNumber)).toBe(
      true
    );
    expect(isFavouriteCar("BMW", 999)).toBe(false);
  });
});
