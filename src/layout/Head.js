import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";

const Head = () => {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Door Picker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Head;
