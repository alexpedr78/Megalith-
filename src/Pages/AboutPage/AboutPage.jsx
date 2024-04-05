import React from "react";
import "./AboutPage.css";
function AboutPage() {
  return (
    <div className="about-container">
      <div className="info">
        <article className="detail">
          <div className="textAbout">
            A megalith is a large stone that has been used to construct a
            prehistoric structure or monument, either alone or together with
            other stones. There are over 35,000 in Europe alone, located widely
            from Sweden to the Mediterranean sea. The word was first used in
            1849 by the British antiquarian Algernon Herbert in reference to
            Stonehenge and derives from the Ancient Greek words "mega" for great
            and "lithos" for stone. Most extant megaliths were erected between
            the Neolithic period (although earlier Mesolithic examples are
            known) through the Chalcolithic period and into the Bronze Age.
          </div>
          <div className="textAbout2">
            In the dark forest, beyond the lying mankind where glittery streams
            run over moss covered stones in forgotten caves where powerful
            secrets rest that's where the lord of the heathens is waiting for
            the day of retaliation Lors of the heathens from the dark forests...
            When fog covers the land, when the nights are moonless and cold
            he'll stand in the middle of the grave-hills and he'll swing his old
            sword the holy sword of the heathens, which sound will sing him
            crazy in such nights the animals will hide, the dishounourable will
            forsee their death The trees then sing him odd and fascination
            melodies there are ancient entreaties, runic and elf magic his eyes
            glow in the blue fire, with the promise to kill the fools the wind
            carries his oath out of the forests - you can also hear him!
          </div>
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
