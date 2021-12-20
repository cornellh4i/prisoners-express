// import React, { useState } from "react";
// import { Card, CardContent, Typography } from "@material-ui/core";
// // import mailicon from "./mail.png";
// import Modal from "./Modal.js";

// export default function EssayCard(cardData) {
// 	let image;
// 	if (cardData.cardData["Attachments"][0]["thumbnails"]) {
// 		image = (
// 			<img
// 				src={
// 					cardData.cardData["Attachments"][0]["thumbnails"]["large"][
// 						"url"
// 					]
// 				}
// 				alt="prisoner art"
// 				style={{
// 					width: "84px",
// 					height: "115px",
// 					float: "right",
// 					marginRight: "14px",
// 					marginTop: "15.5px",
// 				}}
// 			/>
// 		);
// 	} else {
// 		image = <img></img>;
// 	}

// 	let responses;
// 	if (cardData.cardData["Responses"]) {
// 		responses = cardData.cardData["Responses"].length;
// 	} else {
// 		responses = 0;
// 	}

// 	const [show, setShow] = useState(false);
// 	return (
// 		<div onClick={() => setShow(true)} style={{}}>
// 			<Card
// 				style={{
// 					width: 332,
// 					backgroundColor: "white",
// 				}}
// 			>
// 				<CardContent>
// 					<Typography
// 						style={{ fontSize: 20, fontWeight: "bold" }}
// 						variant="h4"
// 						component="h2"
// 					>
// 						{cardData.cardData["Title"]}
// 					</Typography>

// 					<Typography
// 						style={{ fontSize: 14 }}
// 						color="textSecondary"
// 						gutterBottom
// 						variant="h3"
// 					>
// 						{cardData.cardData["Author Name"] +
// 							" " +
// 							cardData.cardData["Last Name"]}
// 					</Typography>
// 					<br></br>
// 					<Typography variant="body2" component="p">
// 						Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
// 						Ipsum Lorem Ipsu...
// 					</Typography>
// 					<br></br>
// 					<Typography variant="body2" component="p">
// 						Month, Year
// 						{/* <img src={mailicon} width="20" height="20" align="right" alt="mail icon"></img> */}
// 					</Typography>
// 				</CardContent>
// 			</Card>
// 			<Modal onClose={() => setShow(false)} show={show} />
// 		</div>
// 	);
// }
