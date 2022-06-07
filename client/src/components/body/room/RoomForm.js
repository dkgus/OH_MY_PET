import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const RoomForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      <Form onSubmit={(e) => onSubmit(e)}>
        {/* 이름 */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>예약자 성함</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="name"
            //value={email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* 호텔종류 */}
        <Form.Group className="mb-3">
          <Form.Label>호텔선택</Form.Label>
          <Form.Select>
            <option>호텔1</option>
            <option>호텔2</option>
            <option>호텔3</option>
          </Form.Select>
        </Form.Group>

        {/* 객실 종류 */}
        <Form.Group className="mb-3">
          <Form.Label>호텔선택</Form.Label>
          <Form.Select>
            <option>강아지 기숙사</option>
            <option>강아지 가족 호텔</option>
          </Form.Select>
          <Form.Text className="text-muted" style={{ fontWeight: 700 }}>
            * 강아지 가족호텔은 한 집의 강아지들끼리만 방을 제공합니다.
          </Form.Text>
        </Form.Group>

        {/* 예약시작일 */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>체크인 날짜</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            name="date"
            //value={password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        {/* 예약마지막일 */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>체크아웃 날짜</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            name="date"
            //value={password}
            onChange={(e) => onChange(e)}
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

export default RoomForm;
