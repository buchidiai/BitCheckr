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
  request(
    "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",
    function(error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
    }
  );
});

app.listen(3000, () => {
  console.log(`Running on port ${3000}`);
});
