import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

const App = () => {
  const [currency, setCurrency] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const loadData = async () => {
    try {
      const res = await axios.get("https://interview.switcheo.com/prices.json");
      setCurrency(res.data);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  const handleChangeInput = (e) => {
    setAmount(e.target.value);
  };

  const handleConvert = () => {
    const fromRate = currency.find((item) => item.currency === from)?.price;
    const toRate = currency.find((item) => item.currency === to)?.price;

    if (fromRate && toRate) {
      const converted = (amount / fromRate) * toRate;
      setConvertedAmount(converted.toFixed(2));
    } else {
      console.error("Error: Currency not found");
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="shape"></div>
      <div className="form">
        <h1>Exchange Rate Today</h1>
        <div className="form-input">
          <div>
            <h4>Amount</h4>
            <TextField
              label="Amount"
              id="outlined-size-small"
              size="small"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <h4>From</h4>
            <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">From</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={from}
                label="From"
                onChange={handleChangeFrom}
              >
                {currency.map((item, index) => (
                  <MenuItem key={index} value={item.currency}>
                    {item.currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <h4>To</h4>
            <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">To</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={to}
                label="To"
                onChange={handleChangeTo}
              >
                {currency.map((item, index) => (
                  <MenuItem key={index} value={item.currency}>
                    {item.currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={handleConvert}
          style={{ marginTop: "15px" }}
        >
          Convert
        </Button>
        <div className="form-result">
          {convertedAmount !== null && (
            <h2 >Converted Amount: <b>{convertedAmount}</b></h2>
          )}
        </div>
        <div>
          {convertedAmount !== null && (
            <>
              <h5 style={{ marginTop: "15px" }}>
                {`1 ${from} = ${currency.find((item) => item.currency === from)?.price ||"N/A"}`}
              </h5>
              <h5 style={{ marginTop: "15px" }}>
                {`1 ${to} = ${currency.find((item) => item.currency === to)?.price || "N/A"}`}
              </h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
