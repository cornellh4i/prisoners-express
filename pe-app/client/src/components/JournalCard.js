import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "./JournalModal.js"


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
	const worksBySameAuthor = props.worksBySameAuthor
	console.log(worksBySameAuthor)
	const author = props.author
	const classes = useStyles();
	let mostRecentDate = checkDate(worksBySameAuthor[0]["Last modified time"])
	let modalData = []
	let responses = 0;
	let image;
	worksBySameAuthor.map((entry) => {
	if (check(entry["Attachments"][0]["thumbnails"])) {
		image = (
			<img
				src={
					entry["Attachments"][0]["thumbnails"]["large"][
						"url"
					]
				}
				alt="prisoner art"
				className={classes.image}
			/>
		);
	} else {
		let imgSrc =
			"https://28.cdn.ekm.net/ekmps/shops/simplycoatings2/images/axalta-ral-7040-window-grey-polyester-80-gloss-powder-coating-20kg-box--1759-p.jpg?v=1";
		image = (
			<img
				src={imgSrc}
				alt="grey recentangle"
				className={classes.image}
			/>
		);
	}
		if (entry["Responses"]) {
			responses = entry["Responses"].length;
	}
		const date = checkDate(entry["Last modified time"])
		const obj = {img: image, date: date}
		modalData.push(obj);

		let recent = mostRecentDate.split(" ");
		let dateArr = date.split(" ")

		if (parseInt(dateArr[1]) >  parseInt(recent[1]))
		{
			mostRecentDate = date
		}
		else if (dates.indexOf(dateArr[0]) > dates.indexOf(recent[0]))
		{
			mostRecentDate = date
		}


	} )

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
						{checkLoc(
							worksBySameAuthor[0]["City"],
							worksBySameAuthor[0]["State"]
						)}
					</Typography>

					<Typography className={classes.date}>
						{mostRecentDate} 
					 </Typography>

					<Typography className={classes.response}>
						{responses + " Responses"}
					</Typography>
				</CardContent>
				<Modal
				onClose={() => setShow(false)}
				show={show}
				modalData = {modalData}
				responses={responses}
				dates={dates}
			/>
			</Card>
		</div>
	);
}
