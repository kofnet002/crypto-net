import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../Api/Api";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
  const [historicData, seHistoricData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const response = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await response.json();
    seHistoricData(data.prices);
  };


  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  // const data2 = {
  //   labels: ["Kofi", "Frimpong", "Junior",],
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [65, 59, 80],
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // };

  return (
    <div className="coin_chart">
      {/* Chart */}
      {!historicData ? (
        <CircularProgress
          size={250}
          thickness={1}
          sx={{ color: "goldenrod" }}
        />
      ) : (""
          // <Line
          //   data={{
          //     labels: historicData.map((coin) => {
          //       let date = new Date(coin[0]);
          //       let time =
          //         date.getHours() > 12
          //           ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          //           : `${date.getHours()}:${date.getMinutes()} AM`;
          //       return days === 1 ? time : date.toLocaleDateString();
          //     }),

          //     datasets: [{data: historicData.map((coin) => coin[1]) }],
          //   }}
          // />
      )}

      {/* Button */}
    </div>
  );
};

export default CoinInfo;
