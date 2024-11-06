import React from "react";
import CarouselCard from "../../Components/Carroussel/Carroussel.jsx";
import "./InfosPage.css";

function InfosPage() {
  return (
    <div className="infos-page">
      <CarouselCard />

      <div className="card explanation-card">
        <h2>Scientific Explanations & Links</h2>
        <p>
          Discover the science behind megalith formations and the ongoing
          research in archaeology.
        </p>
        <ul>
          <li>
            <a href="https://example.com/link1" target="_blank">
              Research Article 1
            </a>
          </li>
          <li>
            <a href="https://example.com/link2" target="_blank">
              Research Article 2
            </a>
          </li>
          <li>
            <a href="https://example.com/link3" target="_blank">
              More resources
            </a>
          </li>
        </ul>
      </div>

      <div className="card data-source-card">
        <h2>Data Source</h2>
        <p>
          Our data is sourced from reliable archaeological databases and is
          updated frequently.
        </p>
        <a href="https://example.com/data-source" target="_blank">
          Visit Data Source
        </a>
      </div>

      <div className="card shop-card">
        <h2>Our Stone Shop</h2>
        <p>
          Check out our collection of rare stones and artifacts in our online
          shop.
        </p>
        <a href="https://example.com/shop" target="_blank">
          Visit Shop
        </a>
      </div>
    </div>
  );
}

export default InfosPage;
