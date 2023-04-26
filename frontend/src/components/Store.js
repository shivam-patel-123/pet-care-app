import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dogfood from "@/images/dogfood.png";
import Image from "next/image";
import { Box, Button } from "@mui/material";

export default function Store() {
  const cards = Array.from(Array(5).keys()); // creates an array of length 5

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {cards.map((card) => (
          <Card key={card} sx={{ maxWidth: 300, margin: "25px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Dog food"
              subheader="September 14, 2016"
            />
            <Image src={dogfood} alt="dogfood" width={200} height={200} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet nulla esse temporibus ullam dolore saepe culpa eius
                aspernatur non, inventore, quasi accusamus alias quis
                dignissimos, soluta minima! Pariatur, vero voluptatem?
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button variant="outlined">Order</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}
