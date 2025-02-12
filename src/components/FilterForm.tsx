import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CarListQueryParams, Manufacturer } from "../types/car";

const FilterForm: React.FC<{
  colorList: string[];
  manufacturerList: Manufacturer[];
  currentQueryParams: CarListQueryParams;
  onSubmitFilter(color?: string, manufacturer?: string): void;
}> = ({ colorList, manufacturerList, currentQueryParams, onSubmitFilter }) => {
  const [color, setColor] = React.useState(currentQueryParams.color || "");
  const [manufacturer, setManufacturer] = React.useState(
    currentQueryParams.manufacturer || ""
  );

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
    <Grid2 size={{ xs: "grow", sm: 12, md: 12, xl: 3 }}>
      <Box component="form" className="filter-form">
        <FormControl fullWidth>
          <FormControlLabel
            className="filter-form-label"
            labelPlacement="top"
            control={
              <Select
                className="filter-form-select"
                value={color}
                onChange={handleColorChange}
                displayEmpty
                fullWidth
                MenuProps={{
                  PaperProps: {
                    className: "filter-form-select-menu",
                    elevation: 0,
                  },
                }}
              >
                <MenuItem value="" className="filter-form-select-menu-item">
                  All car colors
                </MenuItem>
                {colorList.map((color) => (
                  <MenuItem
                    key={color}
                    value={color}
                    className="filter-form-select-menu-item"
                  >
                    {color}
                  </MenuItem>
                ))}
              </Select>
            }
            label="Color"
          />
        </FormControl>
        <FormControl fullWidth>
          <FormControlLabel
            className="filter-form-label"
            labelPlacement="top"
            control={
              <Select
                className="filter-form-select"
                value={manufacturer}
                onChange={handleManufacturerChange}
                displayEmpty
                fullWidth
                MenuProps={{
                  PaperProps: {
                    className: "filter-form-select-menu",
                    elevation: 0,
                  },
                }}
              >
                <MenuItem value="" className="filter-form-select-menu-item">
                  All Manufacturers
                </MenuItem>
                {manufacturerList.map((manufacturer) => (
                  <MenuItem
                    key={manufacturer.name}
                    value={manufacturer.name}
                    className="filter-form-select-menu-item"
                  >
                    {manufacturer.name}
                  </MenuItem>
                ))}
              </Select>
            }
            label="Manufacturer"
          />
        </FormControl>
        <Box className="filter-form-button-wrapper">
          <Button
            variant="contained"
            className="filter-form-button"
            onClick={() => submitFilter(color, manufacturer)}
          >
            Filter
          </Button>
        </Box>
      </Box>
    </Grid2>
  );
};

export default FilterForm;
