import React from "react";
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
        <div className="logo">
          <img
            src="/image/logo.png"
            className="logo"
            alt="logo"
            style={{ width: "40%" }}
          />
        </div>
        <div className="user_menu" style={{ width: "20%" }}>
          <UserMenu />
        </div>
      </div>

      <div clssName="nav_bar" style={{ height: "10vh", paddingTop: 30 }}>
        <Menubar />
      </div>
    </>
  );
};

export default Header;
