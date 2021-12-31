import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import mailicon from "./mail.png";
// import greyrectangle from "./grey_rectangle.jpeg"
import Modal from "./Modal.js";
import { withStyles, makeStyles } from "@material-ui/core/styles";

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
		width: "314px",
		height: "185px",
	},
	cardcontent: {
		padding: "0px",
	},
	image: {
		width: "104.64px",
		height: "148px",
		float: "right",
		marginRight: "25.36px",
		marginTop: "16px",
	},
	title: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "20px",
		paddingTop: "16px",
		paddingLeft: "16px",
	},
	author: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "14px",
		paddingLeft: "16px",
	},
	location: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "14px",
		paddingTop: "3.83px",
		paddingLeft: "16px",
	},
	date: {
		marginBottom: 12,
		fontFamily: "'Open Sans', sans-serif",
		fontWeight: 400,
		fontStyle: "normal",
		fontSize: "12px",
		paddingTop: "4px",
		paddingLeft: "16px",
		color: "#828282",
	},
	response: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "12px",
		paddingTop: "10px",
		paddingLeft: "16px",
		color: "#828282",
	},
});

function check(data) {
	return typeof data !== 'undefined' ? data : ""
}

export default function PoetryCard(cardData) {
	const classes = useStyles();
	const [show, setShow] = useState(false);
	const poetryData = cardData.cardData;
	let image;
	let imgSrc;
	if (poetryData["Attachments"][0]["thumbnails"]) {
		imgSrc = poetryData["Attachments"][0]["thumbnails"]["large"]["url"];
		image = (
			<img src={imgSrc} alt="prisoner poetry" className={classes.image} />
		);
	} else {
		image = <img></img>;
	}

	let responses;
	if (poetryData["Responses"]) {
		responses = poetryData["Responses"].length;
	} else {
		responses = 0;
	}
	return (
		<div onClick={() => setShow(true)}>
			<Card className={classes.card}>
				<CardContent className={classes.cardcontent}>
					{image}
					<Typography className={classes.title}>
						{check(cardData.cardData["Title"])}
					</Typography>

					<Typography className={classes.author}>
						{check(cardData.cardData["Author Name"]) +
							" " +
							check(cardData.cardData["Last Name"])}
					</Typography>

					<Typography className={classes.date}>
						{dates[
							parseInt((check(
								cardData.cardData["Last modified time"])).split(
									"-"
								)[1]
							) - 1
						] +
							" " +
							check(cardData.cardData["Last modified time"]).split(
								"-"
							)[0]}
					</Typography>

					<Typography className={classes.response}>
						{responses + " Responses"}
					</Typography>
				</CardContent>
			</Card>
			<Modal onClose={() => setShow(false)} show={show}
				artData={poetryData} imgSrc={imgSrc} responses={responses} dates={dates} />
		</div>
	);
}
