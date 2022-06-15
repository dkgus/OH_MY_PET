import React from "react";
import { Nav } from "react-bootstrap";

const Menubar = () => {
  return (
    <>
      <Nav
        justify="true"
        //activeKey="/home"
        className="nav_box"
        style={{ backgroundColor: "#f7f4f0", borderRadius: 10 }}
      >
        <Nav.Item>
          <Nav.Link
            href="/"
            className="nav_item"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            community
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/"
            eventKey="link-1"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Event & Notice
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/room_reservation"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Room reservation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
            href="/room_reservation1"
          >
            sth
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Menubar;
