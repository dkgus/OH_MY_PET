import React from "react";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import Menubar from "./menuBar";

const Header = () => {
  return (
    <>
      <div
        className="menuBox"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 30,
        }}
      >
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <div className="logo">
            <img
              src="/image/logo.png"
              className="logo"
              alt="logo"
              style={{ width: "40%" }}
            />
          </div>
        </Link>

        <div className="user_menu" style={{ width: "20%" }}>
          <UserMenu />
        </div>
      </div>

      <div className="nav_bar" style={{ height: "10vh", paddingTop: 10 }}>
        <Menubar />
      </div>
    </>
  );
};

export default Header;
