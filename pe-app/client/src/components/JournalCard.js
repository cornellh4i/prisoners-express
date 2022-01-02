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

function check(data) {
	return typeof data !== 'undefined' ? data : ""
}

function checkLoc(data1, data2) {
	if (typeof data1 == 'undefined' && typeof data2 == 'undefined') {
		return ""
	}
	else if (typeof data1 == 'undefined') {
		return data2
	}
	else if (typeof data2 == 'undefined') {
		return data1
	}
	else {
		return data1 + ", " + data2
	}
}

export default function JournalCard(cardData) {
	const classes = useStyles();
	let image;
	if (check(cardData.cardData["Attachments"][0]["thumbnails"])) {
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
		let imgSrc = "https://28.cdn.ekm.net/ekmps/shops/simplycoatings2/images/axalta-ral-7040-window-grey-polyester-80-gloss-powder-coating-20kg-box--1759-p.jpg?v=1";
		image = (
			<img src={imgSrc} alt="grey recentangle" className={classes.image} />)
			;
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
							{check(cardData.cardData["Author Name"]) +
								" " +
								check(cardData.cardData["Last Name"])}
						</Typography>

						<Typography
							variant="h5"
							component="h2"
							className={classes.location}
							color="black"
						>
							{checkLoc(cardData.cardData["City"], cardData.cardData["State"])}
						</Typography>

						<Typography className={classes.date}>
							{dates[
								parseInt((
									check(cardData.cardData[
										"Last modified time"
									])).split("-")[1]
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
			}
		</div>
	);
}
