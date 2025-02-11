import React from "react";
import { Car, CarListWithMetadata } from "../types/car";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
} from "@mui/material";

interface CarListProps {
  carListWithMetadata: CarListWithMetadata;
  currentPage: number;
  isCarListLoading: boolean;
  changeCurrentPage(page: number): void;
    onCarSelect(index: number): void;
}

const CarList: React.FC<CarListProps> = ({
  carListWithMetadata,
  currentPage,
  isCarListLoading,
  changeCurrentPage,
  onCarSelect,
}) => {
  const { cars } = carListWithMetadata || [];
  console.log(cars, "sdsd");
  console.log(carListWithMetadata, "sdsd");

  return (
    <Grid2 size={9}>
    <Box component={"section"} sx={{ marginTop: 2 }} width={"100%"}>
      <h2>Available cars</h2>
      <p>
        Showing {cars.length} of {carListWithMetadata.totalCarsCount} results
      </p>
      <Grid2 container spacing={2} component={"ul"}>
        {cars.map((car: Car, index: number) => (
          <Grid2
            key={car.stockNumber + index}
            component={"li"}
            sx={{ listStyle: "none", width: "100%" }}
          >
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 80 }}
                image={car.pictureUrl}
                alt={`${car.manufacturerName} ${car.modelName}`}
              />
              <CardContent sx={{ flex: 1 }}>
                <h3>
                  {car.manufacturerName} {car.modelName}
                </h3>
                <p>{car.fuelType}</p>
                <p>{car.color}</p>
              </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onCarSelect(index)}
                >
                  View Details
                </Button>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <div>
        <button
          onClick={() => changeCurrentPage(1)}
          disabled={currentPage === 1 || isCarListLoading}
        >
          First
        </button>
        <button
          onClick={() => changeCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || isCarListLoading}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {carListWithMetadata.totalPageCount}
        </span>
        <button
          onClick={() => changeCurrentPage(currentPage + 1)}
          disabled={
            currentPage === carListWithMetadata.totalPageCount ||
            isCarListLoading
          }
        >
          Next
        </button>
        <button
          onClick={() => changeCurrentPage(carListWithMetadata.totalPageCount)}
          disabled={
            currentPage === carListWithMetadata.totalPageCount ||
            isCarListLoading
          }
        >
          Last
        </button>
      </div>
    </Box>
    </Grid2>
  );
};

export default CarList;
