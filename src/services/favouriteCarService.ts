import { Car } from "../types/car";

const STORAGE_KEY = "favouriteCars";

export const getFavouriteCars = (): Car[] => {
  const storedCars = localStorage.getItem(STORAGE_KEY);
  return storedCars ? JSON.parse(storedCars) : [];
};

const saveFavouriteCars = (cars: Car[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
};

export const addFavouriteCar = (car: Car) => {
  const cars = getFavouriteCars();
  if (!cars.some((c) => c.manufacturerName === car.manufacturerName && c.stockNumber === car.stockNumber)) {
    cars.push(car);
    saveFavouriteCars(cars);
  }
};

export const removeFavouriteCar = (manufacturerName: string, stockNumber: number) => {
  const cars = getFavouriteCars().filter((car) => car.manufacturerName !== manufacturerName && car.stockNumber !== stockNumber);
  saveFavouriteCars(cars);
};

export const isFavouriteCar = (manufacturerName: string, stockNumber: number): boolean => {
  return getFavouriteCars().some((car) => car.manufacturerName === manufacturerName && car.stockNumber === stockNumber);
};