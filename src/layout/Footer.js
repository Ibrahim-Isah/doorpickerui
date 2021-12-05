import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://myessl.com">
        DoorPicker
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Doorpicker all the way!
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
