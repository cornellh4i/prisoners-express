import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import mailicon from "./mail.png";
// import artworkimg from "./Rectangle.png";
import Modal from "./Modal.js";
import "../css/ArtworkCard.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	card: {
		boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
		borderRadius: "20px",
		width: "314px",
	},
	image: {
		height: "200px",
		display: "block",
		margin: "auto",
		paddingBottom: "10px",
	},
	title: {
		fontFamily: "'Open Sans', sans-serif",
		fontSize: 20,
		fontWeight: "bold",
	},
	author: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontSize: "14px",
	},
	date: {
		fontFamily: "'Open Sans', sans-serif",
		fontWeight: 400,
		fontStyle: "normal",
		fontSize: "11.35px",
		paddingTop: "5px",
		color: "#828282",
	},
	response: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "11.35px",
		paddingTop: "20px",
		color: "#828282",
	},
});

export default function ArtworkCard(cardData) {
	const classes = useStyles();

	const [show, setShow] = useState(false);
	let image;
	let imgSrc;
	let artData = cardData.cardData;
	if (artData["Attachments"][0]["thumbnails"]) {
		imgSrc = artData["Attachments"][0]["thumbnails"]["large"]["url"];
		image = (
			<img src={imgSrc} alt="prisoner art" className={classes.image} />
		);
	} else {
		image = <img></img>;
		imgSrc = "";
		//this should be the source of some empty image
	}

	let responses;
	if (artData["Responses"]) {
		responses = artData["Responses"].length;
	} else {
		responses = 0;
	}

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

	return (
		<div className="Card" onClick={() => setShow(true)} style={{}}>
			<Modal
				onClose={() => setShow(false)}
				show={show}
				artData={artData}
				imgSrc={imgSrc}
				responses={responses}
				dates={dates}
			/>
			<Card className={classes.card}>
				<CardContent>
					{image}
					<Typography className={classes.title}>
						{artData["Title"]}
					</Typography>

					<Typography className={classes.author}>
						{artData["Author Name"] + " " + artData["Last Name"]}
					</Typography>
					<Typography className={classes.date}>
						{dates[
							parseInt(
								artData["Last modified time"].split("-")[1]
							) - 1
						] +
							" " +
							artData["Last modified time"].split("-")[0]}
					</Typography>
					<Typography className={classes.response}>
						{responses + " Responses"}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}
