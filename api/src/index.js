const AirtableCache = require("./airtableCache.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { setIntervalAsync } = require("set-interval-async/dynamic");
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.options("*", cors());
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../client/build")));

const url = `https://api.airtable.com/v0/${process.env.BASE_ID}/${process.env.TABLE_NAME}`;

const cache = new AirtableCache(url, process.env.API_KEY);
cache.triggerUpdate();
setIntervalAsync(cache.triggerUpdate, 5 * 60000); // refresh every 5 min

app.get("/", function (req, res) {
	// console.log(cache.data);
	res.send(cache.data);
});

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
