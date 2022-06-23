import React from "react";
import { Nav } from "react-bootstrap";
import { connect, useSelector } from "react-redux";

const Menubar = ({ isAuthenticated }) => {
  const user = useSelector((state) => state.auth.user);

  const guest = (
    <>
      <Nav
        justify="true"
        //activeKey="/home"
        className="nav_box"
        style={{ backgroundColor: "#f7f4f0", borderRadius: 10 }}
      >
        <Nav.Item>
          <Nav.Link
            href="/community/list"
            className="nav_item"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            community
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/event_reservation"
            eventKey="link-1"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Event
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
            Notice
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
  const member = (
    <>
      <Nav
        justify="true"
        //activeKey="/home"
        className="nav_box"
        style={{ backgroundColor: "#f7f4f0", borderRadius: 10 }}
      >
        <Nav.Item>
          <Nav.Link
            href="/community/list"
            className="nav_item"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            community
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/event_reservation"
            eventKey="link-1"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Event
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
            Notice
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
  const admin = (
    <>
      <Nav
        justify="true"
        //activeKey="/home"
        className="nav_box"
        style={{ backgroundColor: "#f7f4f0", borderRadius: 10 }}
      >
        <Nav.Item>
          <Nav.Link
            href="/admin/users"
            className="nav_item"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            회원 전체조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/event"
            eventKey="link-1"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            이벤트 예약 조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/admin/room"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            호텔 예약 조회
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
            href="/room_reservation1"
          >
            Notice
          </Nav.Link>
        </Nav.Item> */}
      </Nav>
    </>
  );

  return <>{isAuthenticated ? (user.role === 0 ? admin : member) : guest}</>;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Menubar);
