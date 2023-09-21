import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/hub">Hub</Link>
      </li>
      {/* <li className="navbar-item">
        <Link to="/profile">Profile</Link>
      </li> */}
      <li className="navbar-item">
        <Link to="/mycharacters">My Characters</Link>
      </li>
      <li className="navbar-item">
        <Link to="/favorites">Favorites</Link>
      </li>
      {localStorage.getItem("dad_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("dad_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
