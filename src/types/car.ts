export const enum FuelType {
  DIESEL = "Diesel",
  PETROL = "Petrol",
}

export const enum MileageUnit {
  KM = "km",
  MI = "mi",
}

export type Mileage = {
  number: number;
  unit: MileageUnit;
};

export type Car = {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: Mileage;
  fuelType: FuelType;
  color: string;
  pictureUrl: string;
};

export type CarListWithMetadata = {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

export type CarListQueryParams = {
  page: number;
  color?: string;
  manufacturer?: string;
};

export type ColorListOutput = {
  colors: string[];
};

export type Model = {
  name: string;
};

export type Manufacturer = {
  name: string;
  models: Model[];
};

export type ManufacturerListOutput = {
  manufacturers: Manufacturer[];
};