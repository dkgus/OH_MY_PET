import React from "react";
import { Nav } from "react-bootstrap";

const Menubar = () => {
  return (
    <>
      <Nav
        justify="true"
        activeKey="/home"
        className="nav_box"
        style={{ backgroundColor: "#f7f4f0", borderRadius: 10 }}
      >
        <Nav.Item>
          <Nav.Link
            href="/home"
            className="nav_item"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            community
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Event & Notice
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Room reservation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="disabled"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            My page
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Menubar;
