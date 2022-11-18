import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../Api/Api";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../Components/Banner/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "goldenrod" }} />;
  
  return (
    <>
      <div className="coin_info">
        {/* Side bar */}
        <div className="side_bar">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="150"
            style={{ marginBottom: 20 }}
          />

          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 10, textAlign: "center" }}
          >
            {coin?.name}
          </Typography>
          <Typography
            sx={{ width: "100%", textAlign: "justify", mb: 3 }}
            variant="subtitle1"
          >
            {coin?.description.en.split(". ")[0]}
          </Typography>

          <div className="market_data">
            <span style={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h5">
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">{coin?.market_cap_rank}</Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h5">
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5">
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}{" "}
                M
              </Typography>
            </span>
          </div>
        </div>
        {/* Coin Info */}
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;
