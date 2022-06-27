import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { reserveRoom } from "../../../actions/room";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

const RoomForm = ({ reserveRoom }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hotelName: "",
    roomType: "",
    revStart: "",
    revEnd: "",
  });

  const { hotelName, roomType, revStart, revEnd } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (!hotelName || !roomType) {
      alert("호텔과 객실 타입을 선택해주세요.");
    }
    let sdt = new Date(revStart);
    let edt = new Date(revEnd);

    let dateDiff = Math.ceil(
      (edt.getTime() - sdt.getTime()) / (1000 * 3600 * 24)
    );
    if (dateDiff < 0) {
      alert("종료일이 시작일보다 빠릅니다. 다시 설정해주세요");
    } else {
      reserveRoom({ hotelName, roomType, revStart, revEnd, navigate });
    }
  };

  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>호텔 선택</Form.Label>
          <Form.Select
            required
            value={hotelName}
            name="hotelName"
            onChange={(e) => onChange(e)}
          >
            <option>선택해주세요</option>
            <option>[인천] 개편한 세상</option>
            <option>[서울] 앨리스애견호텔</option>
            <option>[경기] 망고쿠로</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>객실 종류 선택</Form.Label>
          <Form.Select
            value={roomType}
            name="roomType"
            onChange={(e) => onChange(e)}
          >
            <option>선택해주세요</option>
            <option>강아지 기숙사</option>
            <option>강아지 가족 호텔</option>
          </Form.Select>
          <Form.Text className="text-muted" style={{ fontWeight: 700 }}>
            * 강아지 가족호텔은 한 집의 강아지들끼리만 방을 사용합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>체크인 날짜</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="date"
            name="revStart"
            value={revStart}
            onChange={(e) => onChange(e)}
            min={new Date().toISOString().slice(0, 10)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>체크아웃 날짜</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="date"
            name="revEnd"
            value={revEnd}
            onChange={(e) => onChange(e)}
            disabled={!revStart}
            min={new Date().toISOString().slice(0, 10)}
          />
        </Form.Group>
        <Button
          type="submit"
          style={{
            backgroundColor: "#ffaf2d",
            border: "none",
            marginTop: 150,
            padding: "1% 50px",
            fontWeight: "bold",
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default connect(null, { reserveRoom })(RoomForm);
