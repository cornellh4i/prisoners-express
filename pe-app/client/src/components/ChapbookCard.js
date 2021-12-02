import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import CardActions from "@material-ui/core/CardActions";

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

export default function ChapbookCard(cardData) {
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
				style={{
					width: "104.64px",
					height: "148px",
					float: "right",
					marginRight: "25.36px",
					marginTop: "16px",
				}}
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
		<div style={{}}>
			<h4></h4>
			{
				<Card
					style={{
						boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
						borderRadius: "20px",
						width: "316px",
						height: "185px",
					}}
				>
					<CardContent
						style={{
							padding: "0px",
						}}
					>
						{image}

            {/* <Card
            style={{
              width: '104.64px',
              height: '148px',
              color: "white",
              float: "right",
              Right: "20.56px",
              marginTop: "16px",
            }}
            >
            </Card>

            <Card
            style={{
              width: '104.64px',
              height: '148px',
              color: "white",
              float: "right",
              marginRight: "16.79px",
              marginTop: "16px",
            }}
            >
            </Card> */}

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
							{cardData.cardData["Title"]}
						</Typography>

						<Typography
							variant="h5"
							component="h2"
							style={{
								fontFamily: "Open Sans",
								fontStyle: "normal",
								fontWeight: "normal",
								fontSize: "14px",
								paddingTop: "12px",
								paddingLeft: "16px",
							}}
							color="black"
						>
							{cardData.cardData["Author Name"] +
								" " +
								cardData.cardData["Last Name"]}
						</Typography>

						<Typography
							style={{
								marginBottom: 12,
								fontFamily: "Open Sans",
								fontWeight: 400,
								fontStyle: "normal",
								fontSize: "12px",
								paddingTop: "4px",
								paddingLeft: "16px",
								color: "#828282",
							}}
						>
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

						<Typography
							style={{
								fontFamily: "Open Sans",
								fontStyle: "normal",
								fontWeight: "normal",
								fontSize: "12px",
								paddingTop: "45px",
								paddingLeft: "16px",
								color: "#828282",
							}}
						>
							{responses +" Responses"}
						</Typography>
					</CardContent>
				</Card>
			}
		</div>
	);
}
