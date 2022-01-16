import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
		height: "30vh",
		width: "20vw",
		minHeight: "116px",
		minWidth: "330px",
	},
	cardcontent: {
		padding: "1.5vw",
	},
	imgBox: {
		margin: "auto",
		display: "block",
	},
	title: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "20px",
	},
	author: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "14px",
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
	info: {
		position: "relative",
		width: "50%",
	},
	responseDiv: {
		bottom: 0,
		margin: "auto",
		position: "absolute",
	},
});

function check(data) {
	return typeof data !== "undefined" ? data : "";
}

function checkDate(data) {
	return data !== undefined ? dates[parseInt(data.split("-")[1]) - 1] + " " + data.split("-")[0] : "";
}

export default function PoetryCard(props) {
	const classes = useStyles();
	const [show, setShow] = useState(false);
	const { cardData, responses, openModal, imgSrc } = props;

	let title = cardData["Title"];
	title = title.length > 22 ? title.slice(0, 20) + "... " : title;

	const image =
		<img src={imgSrc}
			alt={imgSrc == rectangle ? "grey rectangle" : "prisoner poetry"}
			style={{
				height: "22vh",
				maxHeight: "100%",
				maxWidth: "10vw",
			}} />

	return (
		<div onClick={openModal}>
			<Card className={classes.card}>
				<CardContent className={classes.cardcontent}>
					<Grid container columns={16}>
						<Grid item className={classes.info} xs>
							<Typography className={classes.title}>
								{check(title)}
							</Typography>
							<Typography className={classes.author}>
								{check(cardData["Author Name"]) +
									" " +
									check(cardData["Last Name"])}
							</Typography>
							<Typography className={classes.date}>
								{checkDate(cardData["Last modified time"])}
							</Typography>
							<div className={classes.responseDiv}>
								<Typography className={classes.response}>
									{responses + " Responses"}
								</Typography>
							</div>
						</Grid>
						<Grid item className={classes.imgBox} xs="auto">
							{image}
						</Grid>
					</Grid>
				</CardContent>
			</Card>

		</div>
	);
}
