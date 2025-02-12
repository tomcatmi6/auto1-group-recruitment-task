import React from "react";
import {
  Typography,
  Grid2,
  Stack,
  Box,
  Link,
} from "@mui/material";

const ErrorPage: React.FC = () => (
  <Grid2 container className="error-page-wrapper">
    <Stack spacing={4} className="error-page-content">
      <Box component="img" src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg" alt="404" />
      <Typography variant="h1" className="main-heading">404 - Not Found</Typography>
        <Typography variant="body1" className="car-list-info">
          The page you are looking for does not exist.
        </Typography>
        <Typography variant="body1" className="car-list-info">
          You can always go back to the <Link href="/" className="text-button sub-heading">homepage</Link>. 
      
        </Typography>
    </Stack>
  </Grid2>
);

export default ErrorPage;
