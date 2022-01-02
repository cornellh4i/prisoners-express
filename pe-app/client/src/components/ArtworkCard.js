import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Modal from "./Modal.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	card: {
		boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
		borderRadius: "20px",
	},
	cardcontent: {
		padding: "1.5vw",
	},
	image: {
		height: "30vh",
		display: "block",
		margin: "auto",
		paddingBottom: "2vh",
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
	info: {
		marginLeft: "1vw",
	},
});

function check(data) {
	return data !== undefined ? data : "";
}

export default function ArtworkCard(props) {
	const classes = useStyles();

	const [show, setShow] = useState(false);
	const [imgWidth, setImgWidth] = useState(0);

	const onImgLoad = ({ target: img }) => {
		setImgWidth(img.offsetWidth);
	};

	const handleClickAway = () => {
		setShow(false);
	};
	const handleClick = () => {
		setShow((prev) => !prev);
	};

	const { cardData } = props;

	let responses;
	if (cardData["Responses"]) {
		responses = cardData["Responses"].length;
	} else {
		responses = 0;
	}

	let image;
	let imgSrc;
	if (
		cardData["Attachments"] &&
		cardData["Attachments"][0] &&
		cardData["Attachments"][0]["thumbnails"]
	) {
		imgSrc = cardData["Attachments"][0]["thumbnails"]["large"]["url"];
		image = (
			<img
				onLoad={onImgLoad}
				src={imgSrc}
				alt="prisoner art"
				className={classes.image}
			/>
		);
	} else {
		imgSrc =
			"https://28.cdn.ekm.net/ekmps/shops/simplycoatings2/images/axalta-ral-7040-window-grey-polyester-80-gloss-powder-coating-20kg-box--1759-p.jpg?v=1";
		image = (
			<img
				src={imgSrc}
				alt="grey recentangle"
				className={classes.image}
			/>
		);
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
		<div>
			<ClickAwayListener onClickAway={handleClickAway}>
				<div>
					<div
						className="Card"
						onClick={handleClick}
						style={{}}
					></div>
					{show ? (
						<Modal
							// show={show}
							// onClose={() => setShow(false)}
							artData={cardData}
							imgSrc={imgSrc}
							responses={responses}
							dates={dates}
						/>
					) : null}
				</div>
			</ClickAwayListener>
			<Card
				className={classes.card}
				style={{ width: imgWidth > 300 ? "100%" : "22vw" }}
			>
				<CardContent className={classes.cardcontent}>
					{image}

					<div className={classes.info}>
						<Typography className={classes.title}>
							{check(cardData["Title"])}
						</Typography>

						<Typography className={classes.author}>
							{check(cardData["Author Name"]) +
								" " +
								check(cardData["Last Name"])}
						</Typography>
						<Typography className={classes.date}>
							{dates[
								parseInt(
									check(cardData["Last modified time"]).split(
										"-"
									)[1]
								) - 1
							] +
								" " +
								check(cardData["Last modified time"]).split(
									"-"
								)[0]}
						</Typography>
						<Typography className={classes.response}>
							{responses + " Responses"}
						</Typography>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
