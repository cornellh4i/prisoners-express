import { processTable } from "./airtable.js";
require("dotenv").config();
// var app = require("express");
// var apicache = require("apicache");

// let cache = apicache.middleware;

// app.get("/api/collection/:id?", cache("5 minutes"), (req, res) => {
// 	// do some work... this will only occur once per 5 minutes
// 	res.json({ foo: "bar" });
// });

console.log(processTable());
