import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      className="footer-wrapper"
    >
      <Typography variant="body2">© AUTO1 Group 2018</Typography>
    </Box>
  );
};

export default Footer;