import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid2,
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
              data-testid="color-select"
              fullWidth
                MenuProps={{
                  disablePortal: true,
                  PaperProps: {
                    className: "filter-form-select-menu",
                    "data-testid": "color-select-menu",
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
                    data-testid={`color-select-item-${color}`}
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
                data-testid="manufacturer-select"
                MenuProps={{
                  disablePortal: true,
                  MenuListProps: {
                    className: "filter-form-manufacturer-select-menu-list",
                  },
                  PaperProps: {
                    className: "filter-form-select-menu",
                    props: {
                      "data-testid": "manufacturer-select-menu",
                    },
                    elevation: 0,
                  },
                }}
              >
                <MenuItem value="" data-testid={`manufacturer-select-item-all-manufacturers`} className="filter-form-select-menu-item">
                  All Manufacturers
                </MenuItem>
                {manufacturerList.map((manufacturer) => (
                  <MenuItem
                    key={manufacturer.name}
                    data-testid={`manufacturer-select-item-${manufacturer.name}`}
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
            data-testid="filter-button"
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
