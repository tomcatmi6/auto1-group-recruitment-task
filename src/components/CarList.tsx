import React from "react";
import { Car, CarListWithMetadata } from "../types/car";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Grid2,
    Skeleton,
    Stack,
} from "@mui/material";

interface CarListProps {
    carListWithMetadata: CarListWithMetadata | undefined;
    currentPage: number;
    isCarListLoading: boolean;
    changeCurrentPage(page: number): void;
}

const CarList: React.FC<CarListProps> = ({
    carListWithMetadata,
    currentPage,
    isCarListLoading,
    changeCurrentPage,
}) => {
    const cars = carListWithMetadata && carListWithMetadata?.cars ? carListWithMetadata.cars : [];
    console.log(cars, "sdsd");
    console.log(carListWithMetadata, "sdsd");

    const loadingDummyListContent = Array.from({ length: 10 }).map((_, index) => (
        <Grid2 key={index} component={"li"} sx={{ listStyle: "none", width: "100%" }} >
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                {/* Placeholder for image */}
                <CardMedia>
                    <Skeleton variant="rectangular" width={120} height={80} />
                </CardMedia>

                {/* Placeholder for text */}
                <CardContent sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="70%" height={40} />
                    <Skeleton variant="text" width="70%" height={20} />
                    <Skeleton variant="text" width="20%" height={20} />
                </CardContent>
            </Card>
        </Grid2>
    ));

    return (
        <Box component={"section"} sx={{ marginTop: 2 }} width={"100%"}>
            <h2>Available cars</h2>
            {isCarListLoading ? (
            <Stack   spacing={2} component={"ul"}>
                {loadingDummyListContent}
            </Stack>
            ) : carListWithMetadata && cars && cars.length ? (
            <>
                <p>
                Showing {cars.length} of {carListWithMetadata.totalCarsCount}{" "}
                results
                </p>
                <Grid2 container spacing={2} component={"ul"}>
                {cars.map((car: Car, index: number) => (
                    <Grid2 key={car.stockNumber + index} component={"li"} sx={{ listStyle: "none", width: "100%" }}>
                        <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 120, height: 80 }}
                                image={car.pictureUrl}
                                alt={`${car.manufacturerName} ${car.modelName}`}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <h3>{car.manufacturerName} {car.modelName}</h3>
                                <p>{car.fuelType}</p>
                                <p>{car.color}</p>
                            </CardContent>
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
                    onClick={() =>
                    changeCurrentPage(carListWithMetadata.totalPageCount)
                    }
                    disabled={
                    currentPage === carListWithMetadata.totalPageCount ||
                    isCarListLoading
                    }
                >
                    Last
                </button>
                </div>
            </>
            ) : (
            <p>No Cars Available with that results</p>
            )}
        </Box>
    );
};

export default CarList;
