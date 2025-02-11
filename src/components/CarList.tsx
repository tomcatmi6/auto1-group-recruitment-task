import React from "react";
import { Car, CarListWithMetadata } from "../types/car";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { isFavouriteCar } from "../services/favouriteCarService";

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
    <Grid2 size={{ xl: 9, md: 12 }}>
      <Stack
        component={"section"}
        gap={4}
        width={"100%"}
        className="car-list-container"
      >
        <Typography component="h2" className="main-heading">
          Available cars
        </Typography>
        <Typography component="p" className="sub-heading">
          Showing {cars.length} of {carListWithMetadata.totalCarsCount} results
        </Typography>
        <Grid2 container spacing={2} component={"ul"} className="car-list">
          {cars.map((car: Car, index: number) => (
            <Grid2
              key={car.stockNumber + index}
              component={"li"}
              className={`car-list-item ${isFavouriteCar(car.manufacturerName, car.stockNumber) ? "favourite" : ""}`}
            >
              <Card className="car-card" elevation={0}>
                <CardMedia
                  component="img"
                  className="car-image"
                  image={car.pictureUrl}
                  alt={`${car.manufacturerName} ${car.modelName}`}
                />
                <CardContent className="car-content">
                  <Typography
                    variant="h5"
                    component="h3"
                    className="main-heading"
                  >
                    {car.manufacturerName} {car.modelName}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    className="car-list-info"
                  >
                    Stock # {car.stockNumber} - {car.mileage.number}{" "}
                    {car.mileage.unit} - {car.fuelType} - {car.color}
                  </Typography>
                  <Button
                    variant="text"
                    className="text-button"
                    onClick={() => onCarSelect(index)}
                  >
                    View details
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Box component="nav" gap={4} className="pagination-wrapper">
          <Button
            variant="text"
            className="text-button"
            onClick={() => changeCurrentPage(1)}
            disabled={currentPage === 1 || isCarListLoading}
          >
            First
          </Button>
          <Button
            variant="text"
            className="text-button"
            onClick={() => changeCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || isCarListLoading}
          >
            Previous
          </Button>
          <Typography component="span" className="pagination-text">
            Page {currentPage} of {carListWithMetadata.totalPageCount}
          </Typography>
          <Button
            variant="text"
            className="text-button"
            onClick={() => changeCurrentPage(currentPage + 1)}
            disabled={
              currentPage === carListWithMetadata.totalPageCount ||
              isCarListLoading
            }
          >
            Next
          </Button>
          <Button
            variant="text"
            className="text-button"
            onClick={() =>
              changeCurrentPage(carListWithMetadata.totalPageCount)
            }
            disabled={
              currentPage === carListWithMetadata.totalPageCount ||
              isCarListLoading
            }
          >
            Last
          </Button>
        </Box>
      </Stack>
    </Grid2>
  );
};

export default CarList;
