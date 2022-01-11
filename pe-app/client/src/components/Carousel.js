import { Typography } from "@material-ui/core";
import React from "react";
import Carousel from "react-grid-carousel";

const Gallery = (imgSrc, authorName, worksByAuthor) => {
	// const works = worksByAuthor.filter(function (value) { return value[0]["Author Name"] + " " + value[0]["Last Name"] === authorName })
	console.log(authorName);
	return (
		<div>
			{/* <Typography> {worksByAuthor.length + " items"}</Typography> */}
			<Carousel cols={2} rows={1} gap={10} loop>
				{<img width="100%" src={imgSrc.imgSrc} />}

				<Carousel.Item>
					<img width="100%" src={imgSrc.imgSrc} />=
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
