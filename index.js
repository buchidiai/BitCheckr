const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/convert", (req, res) => {
  if (!req.body) {
    return res.status(400).json("Values cannot be empty");
  }
  const coin = req.body.crypto;
  const currency = req.body.fiat;
  const amount = req.body.amount;

  const options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: coin,
      to: currency,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    if (error) {
      return res.status(400).json("Something went wrong");
    }

    const data = JSON.parse(body);
    const price = data.price;

    const currentDate = data.time;

    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(
      `<h1> The current convertion rate of ${amount} ${coin} to ${currency} is ${price} ${currency}</h1>`
    );

    res.send();
  });
});

app.post("/check", (req, res) => {
  if (!req.body) {
    return res.status(400).json("Values cannot be empty");
  }
  const coin = req.body.crypto;
  const currency = req.body.fiat;
  const url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  const apiUrl = url + coin + currency;

  request(apiUrl, function(error, response, body) {
    if (error) {
      return res.status(400).json("Something went wrong");
    }

    const data = JSON.parse(body);
    const price = data.last;
    const currentDate = data.display_timestamp;
    console.log(data, "data");

    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h1> The current price of ${coin} is ${price} ${currency}</h1>`);

    res.send();
  });
});

app.listen(3000, () => {
  console.log(`Running on port ${3000}`);
});
