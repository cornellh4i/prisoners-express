import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "./JournalModal.js"

import rectangle from "./greyrectangle.jpeg";

const dates = [
	"January",
	"Feburary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const useStyles = makeStyles({
	card: {
		boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
		borderRadius: "20px",
		height: "25vh",
		width: "20vw",
	},
	cardcontent: {
		margin: "1.5vw",
		padding: 0,
		position: "relative",
		height: "60%"
	},
	author: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "20px",
	},
	location: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "14px",
	},
	date: {
		fontFamily: "'Open Sans', sans-serif",
		fontWeight: 400,
		fontStyle: "normal",
		fontSize: "12px",

		color: "#828282",
	},
	response: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "12px",
		color: "#828282",
	},
	responseDiv: {
		bottom: 0,
		margin: "auto",
		position: "absolute",
	}
});

function check(data) {
	return data !== undefined ? data : "";
}

function checkDate(data) {
	return data !== undefined ? dates[parseInt(data.split("-")[1]) - 1] + " " + data.split("-")[0] : "";
}

function checkLoc(data1, data2) {
	if (data1 === undefined && data2 === undefined) {
		return "";
	} else if (data1 === undefined) {
		return data2;
	} else if (data2 === undefined) {
		return data1;
	} else {
		return data1 + ", " + data2;
	}
}

export default function JournalCard(props) {
	const [show, setShow] = useState(false);
	const { worksBySameAuthor, author } = props

	const classes = useStyles();
	let mostRecentDate = worksBySameAuthor == null ? "" :
		checkDate(worksBySameAuthor[0]["Last modified time"]);
	let modalData = [];
	let responses = 0;
	let imgSrc = rectangle;
	let image = (
		<img
			src={imgSrc}
			alt="grey recentangle"
			className={classes.image}
		/>
	);
	let location = "";
	let mailingAddr = "";

	if (worksBySameAuthor !== null) {
		location = checkLoc(
			worksBySameAuthor[0]["City"],
			worksBySameAuthor[0]["State"]
		);
		mailingAddr = "\n" +
			check(worksBySameAuthor[0]["Author Name"]) +
			" " +
			check(worksBySameAuthor[0]["Last Name"]) +
			", ID:" +
			"\n" +
			check(worksBySameAuthor[0]["Room Number"]) +
			" " +
			check(worksBySameAuthor[0]["Pre-Address"]) +
			"\n" +
			check(worksBySameAuthor[0]["Address"]) +
			" " +
			check(worksBySameAuthor[0]["City"]) +
			", " +
			check(worksBySameAuthor[0]["State"]) +
			" " +
			check(worksBySameAuthor[0]["Zip"])
		worksBySameAuthor.map((entry) => {
			if (check(entry["Attachments"][0]["thumbnails"])) {
				image = (
					<img
						src={
							entry["Attachments"][0]["thumbnails"]["large"]["url"]
						}
						alt="prisoner journal entry"
						style={{
							height: "30vh",
							margin: "auto",
							position: "relative",
							padding: "1vw",
						}}
					/>
				);
			}
			if (entry["Responses"]) {
				responses = entry["Responses"].length;
			}
			const date = checkDate(entry["Last modified time"])
			const obj = { image: image, date: date }
			modalData.push(obj);

			let recent = mostRecentDate.split(" ");
			let dateArr = date.split(" ")

			if (parseInt(dateArr[1]) > parseInt(recent[1])) {
				mostRecentDate = date
			}
			else if (dates.indexOf(dateArr[0]) > dates.indexOf(recent[0])) {
				mostRecentDate = date
			}
		})

	}

	return (
		<div onClick={() => setShow(true)}>
			<Card className={classes.card}>
				<CardContent className={classes.cardcontent}>
					<Typography className={classes.author} color="#000000">
						{author}
					</Typography>

					<Typography
						variant="h5"
						component="h2"
						className={classes.location}
						color="black"
					>
						{location}
					</Typography>

					<Typography className={classes.date}>
						{mostRecentDate}
					</Typography >

					<div className={classes.responseDiv}>
						<Typography className={classes.response}>
							{responses + " Responses"}
						</Typography>
					</div>
				</CardContent >
				<Modal
					onClose={() => setShow(false)}
					show={show}
					modalData={modalData}
					responses={responses}
					mostRecentDate={mostRecentDate}
					author={author}
					mailingAddr={mailingAddr}
				/>
			</Card >
		</div >
	);
}
