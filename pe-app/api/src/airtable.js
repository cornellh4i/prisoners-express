//import axios from "axios";
var axios = require("axios");
var fs = require("fs");

require("dotenv").config();

function processRecords(records) {
	const res = [];
	for (let record of records) {
		//const airtable_id = record.id;
		const fields = record.fields;
		res.push(JSON.parse(JSON.stringify(fields)));
	}
	return res;
}

function getParams(offset) {
	const params = {
		offset: offset,
		maxRecords: 250,
		view: "OPEN - Public Content - All 🔗",
	};
	return params;
}

const processTable = async () => {
	const url =
		`https://api.airtable.com/v0/` +
		process.env.BASE_ID +
		`/` +
		process.env.TABLE_NAME;

	const headers = {
		Authorization: "Bearer " + process.env.API_KEY,
		"Content-Type": "application/json",
	};
	let res = [];
	try {
		let offset = 0; // no initial offset, explicitely set to 0

		while (true) {
			const params = getParams(offset);
			//let one_rec = [];
			await axios
				.get(url, { params: params, headers: headers })
				.then((response) => {
					offset = response.data.offset;
					res = res.concat(processRecords(response.data.records));
				});

			//res.concat(page_rec);
			if (typeof offset === "undefined") {
				break;
			}
		}
	} catch (error) {
		console.error(error);
	}

	fs.writeFile(
		"records_new.json",
		JSON.stringify(res),
		{ flag: "a" },
		function (err) {
			if (err) {
				return console.error(err);
			}
		}
	);
	return res;
};

processTable();
//export { processTable };
