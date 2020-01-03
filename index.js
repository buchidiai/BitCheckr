const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
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

    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h1> The current price of ${coin} is ${price} ${currency}</h1>`);

    res.send();
  });
});

app.listen(3000, () => {
  console.log(`Running on port ${3000}`);
});
