import React from 'react';
import { Card, CardContent, CardMedia, Box, Button, Typography, Container } from '@mui/material';
import { Car } from '../types/car';

const CarDetails: React.FC<{ car: Car, onDetailsClose(): void }> = ({ car, onDetailsClose }) => {
    return (
        <Container component="section" sx={{width: "100%" }}>
            <Card sx={{ padding: 2 }}>
                <Button variant="contained" color="primary" onClick={() => onDetailsClose()}>Close</Button>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 200 }}
                    image={car.pictureUrl}
                    alt={`${car.manufacturerName} ${car.modelName}`}
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h5">{car.manufacturerName} {car.modelName}</Typography>
                        <Typography variant="body1">Stock # {car.stockNumber} - {car.mileage.number} {car.mileage.unit} - {car.fuelType} - {car.color}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid', padding: 2, textAlign: 'center' }}>
                        <Typography variant="body1">If you like this car, click the button and save it in your collection of favourite items</Typography>
                        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Save</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CarDetails;