import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updateInfo } from "../../../actions/event";
import { useParams } from "react-router";

const EditEvent = ({ updateInfo }) => {
  const navigate = useNavigate();
  const useParam = useParams();
  const { id, editIndex } = useParam;

  const [formData, setFormData] = useState({
    eventNm: "",
    revDate: "",
  });

  const { eventNm, revDate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData", formData);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateInfo({ formData, navigate, id, editIndex });
  };

  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>이벤트 선택</Form.Label>
          <Form.Select
            value={eventNm}
            name="eventNm"
            onChange={(e) => onChange(e)}
          >
            <option>선택해주세요</option>
            <option>[Option 1] 반려동물 패션쇼</option>
            <option>[Option 2] 반려동물과 피크닉</option>
            <option>[Option 3] 망고쿠로 방문후기 특별이벤트</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>참여 날짜</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            name="revDate"
            value={revDate}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <div style={{ fontWeight: "bold" }}>
          * 마이페이지에 저장된 고객님의 정보(성함, 휴대폰번화, 반려동물 이름
          등)로 자동 신청됩니다.
          <br /> 수정을 원하신다면 마이페이지로 이동해주세요.
        </div>
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

export default connect(null, { updateInfo })(EditEvent);
