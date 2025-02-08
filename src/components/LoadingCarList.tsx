import React from "react";
import {
  Box,
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
      sx={{ listStyle: "none", width: "100%" }}
    >
      <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <CardMedia>
          <Skeleton variant="rectangular" width={120} height={80} />
        </CardMedia>

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
      <Stack spacing={2} component={"ul"}>
        {loadingDummyListContent}
      </Stack>
    </Box>
  );
};

export default LoadingCarList;
