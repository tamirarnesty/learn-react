import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onClick, showAddForm }) => {
  // Use the useLocation hook from react-router-dom in order to determine the location of the page
  // This uses the pathname attribute and gives the URL route
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <header className="header">
      <h1>{title}</h1>
      {/* If the pathname is '/' which means "home", then render the add button. Otherwise, don't. */}
      {isHome && 
      <Button
        text={!showAddForm ? "Add" : "Close"}
        onClick={onClick}
        color={!showAddForm ? "steelBlue" : "orange"}
      />}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
