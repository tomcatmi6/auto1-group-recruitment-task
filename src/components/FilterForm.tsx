import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { CarListQueryParams, Manufacturer } from '../types/car';

const FilterForm: React.FC<{colorList: string[], manufacturerList: Manufacturer[], currentQueryParams: CarListQueryParams, onSubmitFilter(color?: string, manufacturer?: string): void}> = ({ colorList, manufacturerList, currentQueryParams, onSubmitFilter}) => {
    const [color, setColor] = React.useState(currentQueryParams.color || '');
    const [manufacturer, setManufacturer] = React.useState(currentQueryParams.manufacturer || '');

    const submitFilter = (color: string, manufacturer: string) => {
       onSubmitFilter(color, manufacturer);
    };

    const handleColorChange = (event: SelectChangeEvent) => {
        setColor(event.target.value as string);
    };

    const handleManufacturerChange = (event: SelectChangeEvent) => {
        setManufacturer(event.target.value as string);
    };

    return (
        <Box 
            component="form" 
            sx={{ 
                border: '1px solid', 
                borderColor: 'grey.400', 
                borderRadius: 1, 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 
            }}
        >
            <FormControl fullWidth>
                <InputLabel id="color-select-label">All car colors</InputLabel>
                <Select
                    labelId="color-select-label"
                    value={color}
                    label="All car colors"
                    onChange={handleColorChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {colorList.map((color) => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="manufacturer-select-label">All manufacturers</InputLabel>
                <Select
                    labelId="manufacturer-select-label"
                    value={manufacturer}
                    label="All manufacturers"
                    onChange={handleManufacturerChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {manufacturerList.map((manufacturer) => (
                        <MenuItem key={manufacturer.name} value={manufacturer.name}>{manufacturer.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={() => submitFilter(color, manufacturer)}>
                    Filter
                </Button>
            </Box>
        </Box>
    );
};

export default FilterForm;