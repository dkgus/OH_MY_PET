import React from "react";
import Banner from "../organism/main/carousel/Banner";
import { Row, Col } from "react-bootstrap";

const Contents = () => {
  return (
    <div className="inner" style={{ height: "2000px" }}>
      <Row>
        <div className="banner_img">
          <Banner />
        </div>
      </Row>
      <Row>
        <div className="event">event</div>
      </Row>

      <Row>
        <div className="room">room</div>
      </Row>
      <Row>
        <Col>
          <div className="community">community</div>
        </Col>
        <Col>
          <div className="notice">notice</div>
        </Col>
      </Row>
    </div>
  );
};

export default Contents;
