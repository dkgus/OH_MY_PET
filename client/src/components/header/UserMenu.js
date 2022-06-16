import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";
import { connect, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const UserMenu = ({ isAuthenticated, logout }) => {
  const user = useSelector((state) => state.auth.user);

  const guest = (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        listStyle: "none",
        padding: 0,
      }}
    >
      <li style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
          Login
        </Link>
      </li>
      <li style={{ fontWeight: "bold", marginLeft: "1%", fontSize: "1.2rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        <Link to="/register" style={{ color: "black", textDecoration: "none" }}>
          Register
        </Link>
      </li>
    </ul>
  );

  const member = (
    <ul
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        listStyle: "none",
        padding: 0,
      }}
    >
      <li style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        <Link
          to={`/my_page/${user._id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          My Page
        </Link>
      </li>
      <li style={{ fontWeight: "bold", marginLeft: "1%", fontSize: "1.2rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        <Link
          to="/logout"
          style={{ color: "black", textDecoration: "none" }}
          onClick={logout}
        >
          Logout
        </Link>
      </li>
    </ul>
  );

  return <>{isAuthenticated ? member : guest}</>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(UserMenu);
