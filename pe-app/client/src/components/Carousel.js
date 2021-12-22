import React from "react";
import Carousel from "react-grid-carousel";

const Gallery = (imgSrc) => {
  return (
    <Carousel cols={2} rows={1} gap={10} loop>

      {<img width="100%" src={imgSrc} />}

      <Carousel.Item>
        <img width="100%" src={imgSrc} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src={imgSrc} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src={imgSrc} />
      </Carousel.Item>
    </Carousel>
  )
}
export default Gallery;