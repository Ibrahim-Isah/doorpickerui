import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Fullpage from "../layout/Fullpage";

const Post = () => {
  return (
    <Fullpage>
      <Container sx={{ my: 16 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Box>
            <Typography variant="h1">Post</Typography>
          </Box>
        </Grid>
      </Container>
    </Fullpage>
  );
};

export default Post;
