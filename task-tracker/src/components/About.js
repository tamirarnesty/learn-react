import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      {/* Use Link from react-router-dom in order to avoid a full page reload by using 'a' tags from html */}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default About;
