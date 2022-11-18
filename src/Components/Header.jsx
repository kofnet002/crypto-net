import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const {currency, setCurrency} = CryptoState();

  return (
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              sx={{
                flex: 1,
                color: "goldenrod",
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "Montserrat",
              }}
              variant="h6"
              onClick={() => navigate("/")}
            >
              Net-Crypto
            </Typography>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                // marginRight: 15,
                color: "white",
                fontFamily: "Montserrat",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"BRL"}>BRL</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
  );
};

export default Header;
