import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import CarDetails from "../components/CarDetails";
import CarList from "../components/CarList";
import FilterForm from "../components/FilterForm";
import LoadingCarList from "../components/LoadingCarList";
import {
  CarListQueryParams,
  CarListWithMetadata,
  ColorListOutput,
  Manufacturer,
  ManufacturerListOutput,
} from "../types/car";

const PanelHost: React.FC = () => {
  const [carListWithMetadata, setCarListWithMetadata] = React.useState<
    CarListWithMetadata | undefined
  >(undefined);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [selectedCarIndex, setSelectedCarIndex] = React.useState<
    number | undefined
  >(undefined);
  const [colorList, setColorList] = React.useState<string[]>([]);
  const [manufacturerList, setManufacturerList] = React.useState<
    Manufacturer[]
  >([]);
  const [carListQueryParams, setCarListQueryParams] =
    React.useState<CarListQueryParams>({
      page: 1,
    });

  const onPageChange = (page: number) => {
    setCarListQueryParams({
      ...carListQueryParams,
      page,
    });
  };

  const onFilterSubmit = (color?: string, manufacturer?: string) => {
    setCarListQueryParams({
      ...carListQueryParams,
      color,
      manufacturer,
    });
  };

  const carListQueryParamsUrl = Object.keys(carListQueryParams)
    .map(
      (key) => `${key}=${carListQueryParams[key as keyof CarListQueryParams]}`
    )
    .join("&");

  const fetchColorList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://auto1-mock-server.vercel.app/api/colors`
      );
      const data: ColorListOutput = await response.json();
      setColorList(data.colors);
    } catch (error: any) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchManufacturerList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://auto1-mock-server.vercel.app/api/manufacturers`
      );
      const data: ManufacturerListOutput = await response.json();
      setManufacturerList(data.manufacturers);
    } catch (error: any) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCarList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://auto1-mock-server.vercel.app/api/cars?${carListQueryParamsUrl}`
      );
      const data: CarListWithMetadata = await response.json();
      setCarListWithMetadata(data);
    } catch (error: any) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColorList();
    fetchManufacturerList();
  }, []);

  useEffect(() => {
    fetchCarList();
  }, [carListQueryParams]);

  const renderPageContent = () => {
    if (loading) {
      return <LoadingCarList />;
    }

    if (error) {
      return <h2>{error}</h2>;
    }

    if (selectedCarIndex !== undefined && carListWithMetadata?.cars) {
      const selectedCar = carListWithMetadata.cars[selectedCarIndex];
      return (
        <CarDetails
          car={selectedCar}
          onDetailsClose={() => setSelectedCarIndex(undefined)}
        />
      );
    }

    if (carListWithMetadata && carListWithMetadata.cars) {
      return carListWithMetadata.cars.length > 0 ? (
        <CarList
          carListWithMetadata={carListWithMetadata}
          currentPage={carListQueryParams.page}
          isCarListLoading={loading}
          changeCurrentPage={onPageChange}
          onCarSelect={(index: number) => setSelectedCarIndex(index)}
        />
      ) : (
        <h2>No cars found</h2>
      );
    }

    return null;
  };

  return (
    <Grid2 container spacing={3} width="100%">
      {selectedCarIndex === undefined && (
        <FilterForm
          colorList={colorList}
          manufacturerList={manufacturerList}
          currentQueryParams={carListQueryParams}
          onSubmitFilter={onFilterSubmit}
        />
      )}
      {renderPageContent()}
    </Grid2>
  );
};

export default PanelHost;
