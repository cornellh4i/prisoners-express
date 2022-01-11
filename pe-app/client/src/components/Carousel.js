import { Typography } from "@material-ui/core";
import React from "react";
import Carousel from "react-grid-carousel";

// function getImage(cardData) {
// 	let image;
// 	let imgSrc;
// 	if (
// 		cardData["Attachments"] &&
// 		cardData["Attachments"][0] &&
// 		cardData["Attachments"][0]["thumbnails"]
// 	) {
// 		imgSrc = cardData["Attachments"][0]["thumbnails"]["large"]["url"];
// 		image = (
// 			<img
// 				onLoad={onImgLoad}
// 				src={imgSrc}
// 				alt="prisoner art"
// 				className={classes.image}
// 			/>
// 		);
// 	} else {
// 		imgSrc = "greyrectangle.jpg";
// 		image = (
// 			<img
// 				src={imgSrc}
// 				alt="grey rectangle"
// 				className={classes.image}
// 			/>
// 		);
// 	}

// return image;
// }

function getResponses(cardData) {
	let responses;
	if (cardData["Responses"]) {
		responses = cardData["Responses"].length;
	} else {
		responses = 0;
	}

	return responses;
}

// const [show, setShow] = useState(false);

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

const Gallery = (imgSrc, worksByAuthor) => {
	return (
		<div>
			{/* <Typography> {worksByAuthor.length + " items"}</Typography> */}
			<Carousel cols={2} rows={1} gap={10} loop>
				{<img width="100%" src={imgSrc.imgSrc} />}

				<Carousel.Item>
					<img width="100%" src={imgSrc.imgSrc} />
					{/* <div onClick={() => setShow(true)} style={{}}>
						<Modal onClose={() => setShow(false)} show={show}
							artData={cardData}
							imgSrc={getImage(worksByAuthor[0])}
							responses={getResponses(worksByAuthor[0])}
							dates={dates}
							worksByAuthor={worksByAuthor} />
						<Card
							className={classes.card}
							style={{ width: imgWidth > 300 ? "100%" : "22vw" }}
						></Card>
					</div> */}

				</Carousel.Item>
				<Carousel.Item>
					<img width="100%" src={imgSrc.imgSrc} />
				</Carousel.Item>
				<Carousel.Item>
					<img width="100%" src={imgSrc.imgSrc} />
				</Carousel.Item>
			</Carousel>
		</div>
	);
};
export default Gallery;
