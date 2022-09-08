import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnPath = (path) => {
    if (path === location.pathname) {
      return true;
    }
    return false;
  };

  return (
    <footer className="d-flex justify-content-center align-items-center fixed-bottom bg-light">
      <nav className="w-100 mt-3">
        <ul className="d-flex justify-content-around m-0 p-0">
          <li
            className="d-flex flex-column align-items-center"
            role="button"
            onClick={() => navigate("/")}
          >
            <ExploreIcon
              fill={isOnPath("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className="navbarListItemName"
              style={
                isOnPath("/") ? { color: "#2c2c2c" } : { color: "#8f8f8f" }
              }
            >
              Explore
            </p>
          </li>
          <li
            className="d-flex flex-column align-items-center"
            role="button"
            onClick={() => navigate("/offers")}
          >
            <OfferIcon
              fill={isOnPath("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className="navbarListItemName"
              style={
                isOnPath("/offers")
                  ? { color: "#2c2c2c" }
                  : { color: "#8f8f8f" }
              }
            >
              Offers
            </p>
          </li>
          <li
            className="d-flex flex-column align-items-center"
            role="button"
            onClick={() => navigate("/profile")}
          >
            <PersonOutlineIcon
              fill={isOnPath("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className="navbarListItemName"
              style={
                isOnPath("/profile")
                  ? { color: "#2c2c2c" }
                  : { color: "#8f8f8f" }
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
