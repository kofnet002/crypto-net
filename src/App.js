import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";

const App = () => {
 
  return (
      <BrowserRouter>
        <div
          style={
            {
              backgroundColor: "#14161a",
              color: "white",
              minHeight: "100vh",
            }
          }
        >
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;
