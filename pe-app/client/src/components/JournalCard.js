import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
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
		height: "146px",
	},
	cardcontent: {
		padding: "0px",
	},
	image: {
		width: "84px",
		height: "115px",
		float: "right",
		marginRight: "14px",
		marginTop: "15.5px",
	},
	author: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "20px",
		paddingTop: "16px",
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
		fontSize: "11.35px",
		paddingTop: "5px",
		paddingLeft: "16px",
		color: "#828282",
	},
	response: {
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: "11.3494px",
		paddingTop: "20px",
		paddingLeft: "16px",
		color: "#828282",
	},
});

export default function JournalCard(cardData) {
	const classes = useStyles();
	let image;
	if (cardData.cardData["Attachments"][0]["thumbnails"]) {
		image = (
			<img
				src={
					cardData.cardData["Attachments"][0]["thumbnails"]["large"][
						"url"
					]
				}
				alt="prisoner art"
				className={classes.image}
			/>
		);
	} else {
		image = <img className={classes.image}></img>;
	}

	let responses;
	if (cardData.cardData["Responses"]) {
		responses = cardData.cardData["Responses"].length;
	} else {
		responses = 0;
	}

	return (
		<div>
			<h4></h4>
			{
				<Card className={classes.card}>
					<CardContent className={classes.cardcontent}>
						{image}
						<Typography className={classes.author} color="#000000">
							{cardData.cardData["Author Name"] +
								" " +
								cardData.cardData["Last Name"]}
						</Typography>

						<Typography
							variant="h5"
							component="h2"
							className={classes.location}
							color="black"
						>
							{cardData.cardData["City"] +
								", " +
								cardData.cardData["State"]}
						</Typography>

						<Typography className={classes.date}>
							{dates[
								parseInt(
									cardData.cardData[
										"Last modified time"
									].split("-")[1]
								) - 1
							] +
								" " +
								cardData.cardData["Last modified time"].split(
									"-"
								)[0]}
						</Typography>

						<Typography className={classes.response}>
							{responses + " Responses"}
						</Typography>
					</CardContent>
				</Card>
			}
		</div>
	);
}
