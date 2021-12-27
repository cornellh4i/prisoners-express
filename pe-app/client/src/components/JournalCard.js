import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@mui/styles";
import "../css/CardStyling.css";

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

export default function JournalCard(cardData) {
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
			/>
		);
	} else {
		image = <img></img>;
	}

	let responses;
	if (cardData.cardData["Responses"]) {
		responses = cardData.cardData["Responses"].length;
	} else {
		responses = 0;
	}

	return (
		<div>
			<Card>
				<CardContent>
					{image}
					<Typography
						style={{
							fontFamily: "Open Sans",
							fontStyle: "normal",
							fontWeight: "bold",
							fontSize: "20px",
							paddingTop: "16px",
							paddingLeft: "16px",
						}}
						color="#000000"
					>
						{cardData.cardData["Author Name"] +
							" " +
							cardData.cardData["Last Name"]}
					</Typography>

					<Typography
						variant="h5"
						component="h2"
						style={{
							fontFamily: "Open Sans",
							fontStyle: "normal",
							fontWeight: "normal",
							fontSize: "14px",
							paddingTop: "3.83px",
							paddingLeft: "16px",
						}}
						color="black"
					>
						{cardData.cardData["City"] +
							", " +
							cardData.cardData["State"]}
					</Typography>

					<Typography
						style={{
							marginBottom: 12,
							fontFamily: "Open Sans",
							fontWeight: 400,
							fontStyle: "normal",
							fontSize: "11.35px",
							paddingTop: "5px",
							paddingLeft: "16px",
							color: "#828282",
						}}
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
		</div>
	);
}
