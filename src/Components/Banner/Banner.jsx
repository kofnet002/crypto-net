import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(./banner.jpg)" }}>
      <Container
        sx={{
          height: 600,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "10%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              mb:3
            }}
          >
            Net-Crypto
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favorite Crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
