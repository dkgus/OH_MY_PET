import React, { useEffect } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getAllEventInfo } from "../../../actions/admin";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";

const columns2 = [
  { dataField: "name", text: "회원명" },
  { dataField: "email", text: "이메일" },
  { dataField: "nickname", text: "반려동물 이름" },
  { dataField: "type", text: "반려동물 타입" },
  { dataField: "regStart", text: "예약 시작일" },
  { dataField: "regEnd", text: "예약 종료일" },
  { dataField: "register", text: "예약일" },
  { dataField: "phone", text: "휴대폰 번호" },
  { dataField: "role", text: "회원등급" },
];

const columns = [
  { dataField: "name", text: "회원명" },
  { dataField: "email", text: "이메일" },
  { dataField: "phone", text: "휴대폰 번호" },
  { dataField: "nickname", text: "반려동물 이름" },
  { dataField: "type", text: "반려동물 타입" },
  { dataField: "eventNm", text: "이벤트명" },
  { dataField: "revDate", text: "이벤트 참여일" },
  { dataField: "regDt", text: "예약일" },
];

const eventArr = [];

const Events = ({ getAllEventInfo, allEvents }) => {
  useEffect(() => {
    getAllEventInfo();
  }, [getAllEventInfo]);
  allEvents &&
    allEvents.map((item) => {
      const { _id, eventNm, regDt, revDate, user } = item;

      const MomentEventDate = <Moment format="YYYY/MM/DD">{revDate}</Moment>;
      const MomentRegisterDate = <Moment format="YYYY/MM/DD">{regDt}</Moment>;

      eventArr.push({
        _id: _id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        nickname: user.nickname,
        type: user.type,
        eventNm: eventNm,
        revDate: MomentEventDate,
        regDt: MomentRegisterDate,
      });
    });
  return (
    <>
      <h5 style={{ fontWeight: "bold" }}>전체 이벤트 예약 조회</h5>
      <BootstrapTable
        keyField="name"
        data={eventArr}
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
  allEvents: state.admin.reservationInfo,
});
export default connect(mapStateToProps, { getAllEventInfo })(Events);
