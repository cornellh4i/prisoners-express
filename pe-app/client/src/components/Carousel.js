import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Carousel from "react-grid-carousel";
import rectangle from "./greyrectangle.jpeg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	card: {
		// boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.1)",
		borderRadius: "20px",
	},
	cardcontent: {
		padding: "1.5vw",
	},
	image: {
		height: "15vh",
		display: "block",
		margin: "auto",
		paddingBottom: "2vh",
	},
	title: {
		fontFamily: "'Open Sans', sans-serif",
		fontSize: 15,
		fontWeight: "bold",
	},
	info: {
		marginLeft: "1vw",
	},
});

const Gallery = (props) => {

	const classes = useStyles();
	const { imgSrc, worksByAuthor } = props;
	const [imgWidth, setImgWidth] = useState(0);
	const onImgLoad = ({ target: img }) => {
		setImgWidth(img.offsetWidth);
	};

	function getImage(cardData) {
		// if (
		// 	cardData["Attachments"] &&
		// 	cardData["Attachments"][0] &&
		// 	cardData["Attachments"][0]["thumbnails"]
		// ) {
		// 	return cardData["Attachments"][0]["thumbnails"]["large"]["url"];
		// } else {
		// 	return rectangle;
		// }
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
			imgSrc = rectangle;
			image = (
				<img
					src={imgSrc}
					alt="grey rectangle"
					className={classes.image}
				/>
			);
		}
		return image;
	}

	function getTitle(cardData) {
		return cardData["Title"] !== undefined ? cardData["Title"] : "";
	}

	// console.log(worksByAuthor.length)
	// switch (worksByAuthor) {
	if (worksByAuthor.length <= 1) return null;
	if (worksByAuthor == undefined) return null;
	if (worksByAuthor.length > 1) {
		{ console.log(worksByAuthor.length) }
		return (
			<div>
				<Carousel cols={3} rows={1} gap={10} loop>
					{/* {<img width="100%" src={imgSrc.imgSrc} />} */}

					{
						worksByAuthor.map((entry) => {
							if (imgSrc == getImage(entry)) return null;
							else {
								return (
									<Carousel.Item>
										<Card className={classes.card} style={{ width: imgWidth > 300 ? "100%" : "12.25vw" }}>
											<CardContent className={classes.cardContent}>
												{getImage(entry)}
												<div className={classes.info}>
													<Typography className={classes.title}>
														{getTitle(entry)}
													</Typography>
												</div>
											</CardContent>
										</Card>
									</Carousel.Item>
								);
							}
						})}

					{/* <Carousel.Item>
						<img width="100%" src={imgSrc.imgSrc} />
					</Carousel.Item>
					<Carousel.Item>
						<img width="100%" src={imgSrc.imgSrc} />
					</Carousel.Item>
					<Carousel.Item>
						<img width="100%" src={imgSrc.imgSrc} />
					</Carousel.Item> */}
				</Carousel>
			</div>
		);
	}
	else return null;
	// }

};
export default Gallery;
