import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import CarList from "../components/CarList";
import { CarListQueryParams, CarListWithMetadata } from "../types/car";


const PanelHost: React.FC = () => {

    const [carListWithMetadata, setCarListWithMetadata] = React.useState<CarListWithMetadata | undefined>(undefined);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [carListQueryParams, setCarListQueryParams] = React.useState<CarListQueryParams>({
        page: 1,
    });
    
    const onPageChange = (page: number) => {
        setCarListQueryParams({
            ...carListQueryParams,
            page,
        });
    }


    const carListQueryParamsUrl = Object.keys(carListQueryParams)
        .map(key => `${key}=${carListQueryParams[key as keyof CarListQueryParams]}`)
        .join('&');

    useEffect(() => {
        const fetchCarList = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://auto1-mock-server.vercel.app/api/cars?${carListQueryParamsUrl}`
                );
                const data: CarListWithMetadata = await response.json();
                setCarListWithMetadata(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarList();
    }, [carListQueryParams]);


    return (
    <>
    <Header />
    <Container
      maxWidth="xl"
      style={{ marginTop: "50px" }}
      className="main-container"
      component={"main"}
    >
        
        <CarList carListWithMetadata={carListWithMetadata} currentPage={carListQueryParams.page} isCarListLoading={loading} changeCurrentPage={onPageChange} />
     lfojrepgjoer
    </Container>
    <Footer />
    </>
    )
};

export default PanelHost;
