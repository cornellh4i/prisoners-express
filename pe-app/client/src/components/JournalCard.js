import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function JournalCard(props) {
	const {
		author,
		showNoResponse,
		showResponses,
		selectedAuthors,
		mostRecentDate,
		responses,
		location,
		openModal,
	} = props

	const classes = useStyles();

	if (selectedAuthors.includes(author) &&
		((showNoResponse && responses === 0) ||
			(showResponses && responses > 0))) {
		return (
			<div onClick={openModal}>
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
				</Card >
			</div>
		)
	}
	else {
		return null;
	}
}
