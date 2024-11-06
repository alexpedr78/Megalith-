import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carroussel.css";

function CarouselCard() {
  const images = [
    {
      src: "https://example.com/image1.jpg",
      caption: "Megalith Site 1",
    },
    {
      src: "https://example.com/image2.jpg",
      caption: "Megalith Site 2",
    },
    {
      src: "https://example.com/image3.jpg",
      caption: "Megalith Site 3",
    },
  ];

  return (
    <div className="card carousel-card">
      <h2>Photo Carousel</h2>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={`Slide ${index + 1}`} />
            <p className="legend">{image.caption}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselCard;
