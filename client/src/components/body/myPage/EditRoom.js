import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updateRoom } from "../../../actions/room";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const EditRoom = ({
  updateRoom,
  //roomInfo: { _id, hotelName, roomType, revStart, revEnd, regDt },
}) => {
  const useParam = useParams();
  const { id, editIndex } = useParam;

  // useEffect(() => {
  //   updateRoom({ id, editIndex });
  // }, [updateRoom]);

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
    console.log("formData", formData);

    updateRoom({ formData, navigate, id, editIndex });
  };
  const navigate = useNavigate();

  return (
    <>
      <h4 style={{ fontWeight: "bold" }}>예약 수정하기</h4>
      {/* <div>예약번호: {_id}</div> */}
      {/* <div>예약일 : {regDt}</div> */}
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>호텔 선택</Form.Label>
            <Form.Select
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
              type="date"
              placeholder="date"
              name="revStart"
              value={revStart}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>
              체크아웃 날짜
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="date"
              name="revEnd"
              value={revEnd}
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
    </>
  );
};

const mapStateToProps = (state) => ({
  //roomInfo: state.room.hotelInfo.room,
});

export default connect(mapStateToProps, { updateRoom })(EditRoom);
