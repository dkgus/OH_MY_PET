import React, { useEffect } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getAllRoomInfo } from "../../../actions/admin";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";

const columns = [
  { dataField: "name", text: "회원명" },
  { dataField: "email", text: "이메일" },
  { dataField: "nickname", text: "반려동물 이름" },
  { dataField: "type", text: "반려동물 타입" },
  { dataField: "hotelName", text: "호텔명" },
  { dataField: "roomType", text: "객실종류" },
  { dataField: "regStart", text: "예약 시작일" },
  { dataField: "regEnd", text: "예약 종료일" },
  { dataField: "register", text: "예약일" },
  { dataField: "phone", text: "휴대폰 번호" },
];
const roomArr = [];

const Rooms = ({ getAllRoomInfo, allRooms }) => {
  useEffect(() => {
    getAllRoomInfo();
  }, [getAllRoomInfo]);
  allRooms &&
    allRooms.map((item) => {
      const { hotelName, regDt, revEnd, revStart, roomType, user } = item;

      const MomentRevStart = <Moment format="YYYY/MM/DD">{revStart}</Moment>;
      const MomentRevEnd = <Moment format="YYYY/MM/DD">{revEnd}</Moment>;
      const MomentRegDt = <Moment format="YYYY/MM/DD">{regDt}</Moment>;

      roomArr.push({
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        type: user.type,
        hotelName: hotelName,
        roomType: roomType,
        regStart: MomentRevStart,
        regEnd: MomentRevEnd,
        register: MomentRegDt,
        phone: user.phone,
      });
    });

  return (
    <>
      <h5 style={{ fontWeight: "bold" }}>전체 호텔 예약 조회</h5>
      <BootstrapTable
        keyField="name"
        data={roomArr}
        columns={columns}
        pagination={paginationFactory()}
        bordered={false}
        hover={true}
        rowStyle={{ backgroundColor: "white" }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  allRooms: state.admin.reservationInfo,
});
export default connect(mapStateToProps, { getAllRoomInfo })(Rooms);
