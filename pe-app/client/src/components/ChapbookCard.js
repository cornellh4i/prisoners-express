import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "./Modal.js";

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

export default function ChapbookCard(props) {
	const [show, setShow] = useState(false);
	const { cardData } = props;
	const classes = useStyles();
	let image;
	let imgSrc;
	if (cardData["Attachments"][0]["thumbnails"]) {
		imgSrc = cardData["Attachments"][0]["thumbnails"]["large"]["url"];
		image = (
			<img
				src={imgSrc}
				className={classes.image}
				alt="prisoner chapbook cover"
			/>
		);
	} else {
		image = <img></img>;
	}

	let responses;
	if (cardData["Responses"]) {
		responses = cardData["Responses"].length;
	} else {
		responses = 0;
	}
	return (
		<div onClick={() => setShow(true)}>
			{
				<Card className={classes.card}>
					<CardContent className={classes.cardcontent}>
						{image}
						<Typography className={classes.title}>
							{cardData["Title"]}
						</Typography>
						<Typography className={classes.author}>
							{cardData["Author Name"] +
								" " +
								cardData["Last Name"]}
						</Typography>
						<Typography className={classes.date}>
							{dates[
								parseInt(
									cardData["Last modified time"].split("-")[1]
								) - 1
							] +
								" " +
								cardData["Last modified time"].split("-")[0]}
						</Typography>
						<Typography className={classes.response}>
							{responses + " Responses"}
						</Typography>
					</CardContent>
				</Card>
			}
			<Modal
				onClose={() => setShow(false)}
				show={show}
				artData={cardData}
				imgSrc={imgSrc}
				responses={responses}
				dates={dates}
			/>
		</div>
	);
}
