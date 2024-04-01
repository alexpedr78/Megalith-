import "./Footer.css";
import linkSource from "../../assets/menhir.png";

function Footer() {
  return (
    <div className="footer">
      <div className="logo-footer">
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.megalithic.co.uk" className="imgMenhir">
          <img src={linkSource} alt="link"></img>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <div className="credit-footer">
        <p>All Credits goes to Andy, click on the menhir</p>
      </div>
    </div>
  );
}

export default Footer;
