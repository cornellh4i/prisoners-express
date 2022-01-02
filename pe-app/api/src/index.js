const AirtableCache = require("./airtableCache.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { setIntervalAsync } = require("set-interval-async/dynamic");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
app.options("*", cors());
require("dotenv").config();

const url = `https://api.airtable.com/v0/${process.env.BASE_ID}/${process.env.TABLE_NAME}`;
console.log(url);

const cache = new AirtableCache(url, process.env.API_KEY);
cache.triggerUpdate();
setIntervalAsync(cache.triggerUpdate, 5 * 60000); // refresh every 5 min

app.get("/", function (req, res) {
	res.send(cache.data);
	console.log(cache.data);
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
