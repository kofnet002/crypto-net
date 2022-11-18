import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../Api/Api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const response = await fetch(CoinList(currency));
    const data = await response.json();
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin) => {
      coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search);
    });
  };

  const tableRow = [
    { id: 1, head: "Coin" },
    { id: 2, head: "Price" },
    { id: 3, head: "24h Change" },
    { id: 4, head: "Market Cap" },
  ];

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ margin: 5 }}>
          Net-Crypto Prices by Market Cap
        </Typography>

        <TextField
          label="Search for a crypto currency..."
          variant="standard"
          sx={{ mb: 8, width: "100%", color: "white" }}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{ className: "input_field" }}
          InputProps={{ className: "input_color" }}
        />

        <TableContainer>
          {loading ? (
            <Stack spacing={2}>
              <LinearProgress sx={{ backgroundColor: "goldenrod" }} />
              <LinearProgress color="success" />
              <LinearProgress color="secondary" />
            </Stack>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {tableRow.map((val) => {
                    return (
                      <TableCell
                        sx={{ color: "black", fontWeight: "700" }}
                        key={val.id}
                        align={val.head === "Coin" ? " inherit" : "right"}
                      >
                        {val.head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {coins
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            height="50"
                            sx={{ mb: 1 }}
                          />
                          <div
                            style={{ diplay: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>{" "}
                            <br />
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right" sx={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)} %
                        </TableCell>

                        <TableCell align="right" sx={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{" "}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          color="primary"
          bgcolor="white"
          sx={{
            padding: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "goldenrod",
          }}
          count={(coins?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </>
  );
};

export default CoinsTable;
