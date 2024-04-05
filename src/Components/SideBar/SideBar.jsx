import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar({ isOpen, setIsOpen }) {
  // const [clickedOutside, setClickedOutside] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.className === "logo") {
        return;
      }
      if (!ref.current.contains(event.target)) {
        // console.log(event.target.className === "logo");
        // console.log("outside");
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={`side-bar ${isOpen ? "open" : ""}`}>
      <div>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/map">APP</Link>
          </li>
          <li>
            <Link to="/list">ADMIN PAGE</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
