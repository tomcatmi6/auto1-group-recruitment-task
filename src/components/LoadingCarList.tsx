import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Grid2,
} from "@mui/material";

const LoadingCarList: React.FC = () => {
  const loadingDummyListContent = Array.from({ length: 10 }).map((_, index) => (
    <Grid2
      key={index}
      component={"li"}
      className="car-list-item">
      <Card className="car-card" elevation={0}>
        <CardMedia className="car-image">
          <Skeleton variant="rectangular" width={120} height={100} />
        </CardMedia>
        <CardContent className="car-content" sx={{ width: '100%'}}>
          <Skeleton variant="text" width="60%" height="50px" />
          <Skeleton variant="text" width="60%" height="35px" />
          <Skeleton variant="text" width="15%" height="30px" />
        </CardContent>
            </Card>
          </Grid2>
        ));
        return (
    <Grid2 size={{ xl: 9, md: 12 }}>
      <Stack component={"section"} gap={4} width={"100%"} className="car-list-container">
        <Grid2 container spacing={2} component={"ul"} className="car-list">
          {loadingDummyListContent}
        </Grid2>
      </Stack>
    </Grid2>
  );
};

export default LoadingCarList;
