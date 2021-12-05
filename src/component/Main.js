import React from "react";
import { Grid, Link, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Market from "./Market";

const Main = () => {
  return (
    <div>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(https://source.unsplash.com/random)`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src="https://source.unsplash.com/random"
            alt="welcome"
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Welcome to DoorpIcker
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Sale slogan goes here
              </Typography>
              <Link variant="subtitle1" href="#">
                Explore
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Market />
    </div>
  );
};

export default Main;
