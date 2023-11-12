import axios from "axios";

export const convertToEUR = async (amount, currency) => {
  let res = await axios.get("https://open.er-api.com/v6/latest/EUR");

  switch (currency) {
    case "EUR": {
      return amount;
    }
    case "USD": {
      return amount / res.data.rates.USD;
    }
    case "GBP": {
      return amount / res.data.rates.GBP;
    }
    default:
      throw new Error("Unsupported currency!");
  }
};
