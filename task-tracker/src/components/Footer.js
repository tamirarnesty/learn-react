import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      {/* Use Link from react-router-dom in order to avoid a full page reload by using 'a' tags from html */}
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
