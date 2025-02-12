import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" elevation={0} className="header">
      <Toolbar className="header-wrapper">
        <Box className="logo-container">
          <Typography variant="h1" className="sr-only">
            AUTO1.com Car Search
          </Typography>
          <Box 
            component="img"
            src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg"
            alt="AUTO1.com logo with the word 'AUTO' in italic white text on a blue background, followed by an orange number '1' and '.com' in white on a blue background"
            className="logo-wrapper"
          />
        </Box>
        <Box className="nav-container">
          <Link color="inherit" className="link-button">
            Purchase
          </Link>
          <Link color="inherit" className="link-button">
            My Orders
          </Link>
          <Link color="inherit" className="link-button">
            Sell
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
