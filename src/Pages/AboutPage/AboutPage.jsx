import React from "react";
import "./AboutPage.css";
function AboutPage() {
  return (
    <div className="about-container">
      <div className="article">
        <article>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          itaque excepturi voluptatem natus earum! Pariatur dicta consectetur
          eveniet sed sint enim quo eaque. Similique obcaecati alias illum,
          quas, error rem fuga officiis vel quos nobis excepturi, minus non
          doloremque laborum perspiciatis et voluptates placeat ipsum officia
          suscipit possimus doloribus. Recusandae!
        </article>

        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/p1UKVXA25EM"
            title="Embedded video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
