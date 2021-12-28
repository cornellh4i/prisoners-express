import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import mailicon from "./mail.png";
// import greyrectangle from "./grey_rectangle.jpeg"
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

export default function PoetryCard(cardData) {
	const [show, setShow] = useState(false);
	const poetryData = cardData.cardData;
	let image;
	let imgSrc;
	if (poetryData["Attachments"][0]["thumbnails"]) {
		imgSrc = poetryData["Attachments"][0]["thumbnails"]["large"][
			"url"];
		image = (
			<img
				src={
					imgSrc
				}
				alt="prisoner poetry"
				style={{
					// width: "84px",
					height: "200px",
					display: 'block',
					margin: 'auto',
					paddingBottom: "10px",
				}}
			/>
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
		<div onClick={() => setShow(true)} style={{}}>
			<Card
				style={{
					width: 332,
					backgroundColor: "white",
				}}
			>
				<CardContent>
					{image}
					<Typography
						style={{ fontSize: 20, fontWeight: "bold" }}
						variant="h4"
						component="h2"
					>
						{cardData.cardData["Title"]}
					</Typography>

					<Typography
						style={{ fontSize: 14 }}
						color="textSecondary"
						gutterBottom
						variant="h3"
					>
						{cardData.cardData["Author Name"] +
							" " +
							cardData.cardData["Last Name"]}
					</Typography>

					<Typography
						style={{ fontSize: 14 }}
						color="textSecondary"
						gutterBottom
						variant="h3"
					>
						{dates[
							parseInt(
								cardData.cardData["Last modified time"].split(
									"-"
								)[1]
							) - 1
						] +
							" " +
							cardData.cardData["Last modified time"].split(
								"-"
							)[0]}
					</Typography>

					<br></br>
					<br></br>
					<Typography
						style={{
							fontFamily: "Open Sans",
							fontStyle: "normal",
							fontWeight: "normal",
							fontSize: "11.3494px",
							paddingTop: "20px",
							paddingLeft: "16px",
							color: "#828282",
						}}
					>
						{responses + " Responses"}
					</Typography>
				</CardContent>
			</Card>
			<Modal onClose={() => setShow(false)} show={show}
				artData={poetryData} imgSrc={imgSrc} responses={responses} dates={dates} />
		</div>
	);
}
