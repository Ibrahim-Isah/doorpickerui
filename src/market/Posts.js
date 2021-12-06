import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Posts = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: "5.25%",
                }}
                image="https://source.unsplash.com/random"
                height="180"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Heading
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/post")}>
                  View
                </Button>
                <Button size="small" onClick={() => navigate("/like")}>
                  Like
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
