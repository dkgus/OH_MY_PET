import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";

const UserMenu = () => {
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
        {/* <Link to="/login">Login</Link> */}
        Login
      </li>
      <li style={{ fontWeight: "bold", marginLeft: "1%", fontSize: "1.2rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        {/* <Link to="/register">Register</Link> */}
        Register
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
      <li style={{ fontWeight: "bold", fontSize: "1rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        {/* <Link to="/login">Login</Link> */}
        My Page
      </li>
      <li style={{ fontWeight: "bold", marginLeft: "1%", fontSize: "1rem" }}>
        <MdOutlinePets
          style={{
            color: "#ffaf2d",
            marginBottom: "5px",
            marginRight: "3px",
          }}
        />
        {/* <Link to="/register">Register</Link> */}
        Logout
      </li>
    </ul>
  );

  return <>{guest}</>;
};

export default UserMenu;
