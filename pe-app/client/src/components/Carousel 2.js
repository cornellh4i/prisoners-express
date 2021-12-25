import React from "react";
import Carousel from "react-grid-carousel";
import artworkimg from "./Rectangle.png";

const Gallery = () => {
  return (
    <Carousel cols={3} rows={1} gap={2} loop>
      <Carousel.Item>
        <img width="100%" src={artworkimg} />

      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src={artworkimg} />

      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src={artworkimg} />

      </Carousel.Item>

      <Carousel.Item>
        <img width="100%" src={artworkimg} />

      </Carousel.Item>

      <Carousel.Item>
        <img width="100%" src={artworkimg} />

      </Carousel.Item>

      <Carousel.Item>
        <img width="100%" src={artworkimg} />

      </Carousel.Item>
    </Carousel>
  )
}
export default Gallery;