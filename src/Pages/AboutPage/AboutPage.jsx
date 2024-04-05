import React from "react";
import "./AboutPage.css";
function AboutPage() {
  return (
    <div className="about-container">
      <div className="info">
        <article className="detail">
          where exploration meets education! Immerse yourself in the legends
          surrounding these exceptional sites, where ancient mysteries and
          untold stories await discovery. <br />
          From towering monuments to enigmatic structures, each site holds a
          tale as captivating as it is mysterious.
          <br />
          Join us as we journey !!
          <br /> through the realms of myth and legend, unraveling the secrets
          of the past and igniting our curiosity for the unknown.
          <br /> Embark on an adventure of a lifetime and let the legends of
          Megalith guide your path to enlightenment.
        </article>

        <div className="video-container">
          <iframe
            width="600"
            height="500"
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
