import { Link } from "react-router-dom";
import useAuthUser from "../hooks/authUserhook";
const NavBar = () => {
  const {
    authuser: { username },
    logOut,
  } = useAuthUser();
  const handleLogout = () => {
    logOut();
  };
  let pagelayout;
  if (username.length > 0) {
    pagelayout = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    );
  } else {
    pagelayout = (
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
  }
  return <div>{pagelayout}</div>;
};

export default NavBar;
