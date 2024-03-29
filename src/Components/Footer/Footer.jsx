import "./Footer.css";
import linkSource from "../../assets/menhir.png";

function Footer() {
  return (
    <div className="footer">
      <div>
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <div>
        <a href="https://www.megalithic.co.uk" className="imgMenhir">
          <img src={linkSource} alt="link"></img>
        </a>
        <p>All Credits goes to Andy</p>
      </div>
    </div>
  );
}

export default Footer;
