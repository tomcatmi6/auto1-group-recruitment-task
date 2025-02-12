import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
  Grid2,
  Stack,
} from "@mui/material";
import { Car } from "../types/car";
import {
  addFavouriteCar,
  isFavouriteCar,
  removeFavouriteCar,
} from "../services/favouriteCarService";

const CarDetails: React.FC<{ car: Car; onDetailsClose(): void }> = ({
  car,
  onDetailsClose,
}) => {
  const [isFavourite, setIsFavourite] = React.useState(false);

  useEffect(() => {
    isFavouriteCar(car.manufacturerName, car.stockNumber)
      ? setIsFavourite(true)
      : setIsFavourite(false);
  }, []);

  const handleFavouriteAction = (car: Car) => {
    if (isFavourite) {
      removeFavouriteCar(car.manufacturerName, car.stockNumber);
      isFavouriteCar(car.manufacturerName, car.stockNumber)
        ? setIsFavourite(true)
        : setIsFavourite(false);
    } else {
      addFavouriteCar(car);
      isFavouriteCar(car.manufacturerName, car.stockNumber)
        ? setIsFavourite(true)
        : setIsFavourite(false);
    }
  };

  return (
    <Stack className="car-details" gap={4}>
      <Button
        variant="contained"
        color="primary"
        className="close-button"
        onClick={() => onDetailsClose()}
      >
        Close
      </Button>
      <Box
        component="img"
        src={car.pictureUrl}
        alt={`${car.manufacturerName} ${car.modelName}`}
        className="car-details-image"
      />
      <Grid2
        container
        maxWidth={800}
        className="car-content details"
        columnSpacing={4}
        rowSpacing={4}
      >
        <Grid2 size={{ sm: 12, md: 6 }}>
          <Stack spacing={4}>
            <Typography component="h2" variant="h2" className="main-heading">
              {car.manufacturerName} {car.modelName}
            </Typography>
            <Typography component="p" className="car-list-info">
              Stock # {car.stockNumber} - {car.mileage.number}{" "}
              {car.mileage.unit} - {car.fuelType} - {car.color}
            </Typography>
            <Typography component="p" className="car-list-info">
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={{ sm: 12, md: 6 }}>
          <Stack spacing={2} className="car-details-favourite">
            <Typography component={"p"} className="car-list-info">
              If you like this car, click the button and save it in your
              collection of favourite items.
            </Typography>
            <Button
              variant="contained"
              className="filter-form-button details"
              onClick={() => handleFavouriteAction(car)}
            >
              {isFavourite ? "Remove" : "Save"}
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default CarDetails;
