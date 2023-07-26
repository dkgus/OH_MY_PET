import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getMyInfo } from "../../../actions/myPage";
import { getReserveEventInfo } from "../../../actions/event";
import { GET_MY_INFO, GET_EVENT_INFO } from "../../../actions/types";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

/**
 * 들어갈 정보
 * 1. 회원명
 * 2. 회원이 작성한 글
 * 3. 회원의 펫 호텔 예약(유저명,예약 호텔명, 룸타입, 예약시작, 예약끝일, 애완동물명,타입, 예약일)
 * 4. 회원의 이벤트 예약목록
 *    등..
 *
 */

const columns = [
  { dataField: "hotel_name", text: "호텔 명" },
  { dataField: "room_type", text: "객실 타입" },
  { dataField: "rev_start", text: "숙박 시작일" },
  { dataField: "rev_end", text: "숙박 종료일" },
  { dataField: "reg_dt", text: "예약일" },
];

const columns2 = [
  { dataField: "event_name", text: "이벤트 명" },
  { dataField: "pet_type", text: "반려동물 종류" },
  { dataField: "pet_name", text: "반려동물 이름" },
  { dataField: "rev_dt", text: "이벤트 참여일" },
  { dataField: "reg_dt", text: "예약일" },
];

const MyPage = ({ getMyInfo, myInfo, id, eventInfo }) => {
  let getRoom = [];
  const getEvent = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getMyInfo(id);
    dispatch({
      type: GET_MY_INFO,
      payload: myInfo,
    });
    dispatch({
      type: GET_EVENT_INFO,
      payload: eventInfo,
    });
  }, [getMyInfo]);

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      //room
      myInfo.forEach((item) => {
        if (item._id === row._id) {
          dispatch({
            type: GET_MY_INFO,
            payload: item,
          });
          navigate(`/my_page/${id}/${row._id}`);
        }
      });
    },
  };
  const tableRowEvents2 = {
    onClick: (e, row, rowIndex) => {
      //이벤트
      console.log("row._id2", row._id);

      //window.location.href = `/my_page_event/${id}/${row._id}`;
    },
  };

  eventInfo &&
    eventInfo.forEach((item) => {
      const { _id, eventNm, regDt, revDate, user } = item;
      let momentReserveDate = <Moment format="YYYY/MM/DD">{revDate}</Moment>;
      let momentRegisterDate = <Moment format="YYYY/MM/DD">{regDt}</Moment>;
      let { nickname, type } = user;

      getEvent.push({
        _id: _id,
        event_name: eventNm,
        rev_dt: momentReserveDate,
        reg_dt: momentRegisterDate,
        pet_name: nickname,
        pet_type: type,
      });
    });

  myInfo &&
    myInfo.forEach((item) => {
      console.log("myInfo", myInfo);
      const { hotelName, regDt, revEnd, revStart, roomType, _id } = item;

      let momentStart = <Moment format="YYYY/MM/DD">{revStart}</Moment>;
      let momentEnd = <Moment format="YYYY/MM/DD">{revEnd}</Moment>;
      let momentDate = <Moment format="YYYY/MM/DD">{regDt}</Moment>;

      getRoom.push({
        _id: _id,
        hotel_name: hotelName,
        reg_dt: momentDate,
        rev_end: momentEnd,
        rev_start: momentStart,
        room_type: roomType,
      });
    });

  return (
    <>
      <h4>나의 룸 예약 리스트</h4>
      <div>수정을 원하는 예약을 클릭해주세요 :)</div>
      <BootstrapTable
        keyField="name"
        data={getRoom}
        columns={columns}
        pagination={paginationFactory()}
        bordered={false}
        hover={true}
        rowStyle={{ backgroundColor: "white" }}
        rowEvents={tableRowEvents}
      />

      <h4>나의 이벤트 예약 리스트</h4>
      <div>수정을 원하는 예약을 클릭해주세요 :)</div>
      <BootstrapTable
        keyField="name"
        data={getEvent}
        columns={columns2}
        pagination={paginationFactory()}
        bordered={false}
        hover={true}
        rowStyle={{ backgroundColor: "white" }}
        rowEvents={tableRowEvents2}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  myInfo: state.myPage.myInfo,
  id: state.auth.user._id,
  roomIds: state.myPage,
  eventInfo: state.event.reservationList,
});

export default connect(mapStateToProps, { getMyInfo, getReserveEventInfo })(
  MyPage
);
