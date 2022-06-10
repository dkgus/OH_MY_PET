import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMyInfo } from "../../../actions/myPage";
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
  { dataField: "rev_start", text: "숙박시작일" },

  { dataField: "rev_end", text: "숙박 종료일" },
  { dataField: "reg_dt", text: "예약일" },
];

const MyPage = ({ getMyInfo, myInfo }) => {
  console.log("myInfo", myInfo);

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  let getOne = [];

  myInfo &&
    myInfo.forEach((item) => {
      console.log("item", item);
      const { hotelName, regDt, revEnd, revStart, roomType } = item;
      let momentStart = <Moment format="YYYY/MM/DD">{revStart}</Moment>;
      let momentEnd = <Moment format="YYYY/MM/DD">{revEnd}</Moment>;
      let momentDate = <Moment format="YYYY/MM/DD">{regDt}</Moment>;

      getOne.push({
        hotel_name: hotelName,
        reg_dt: momentDate,
        rev_end: momentEnd,
        rev_start: momentStart,
        room_type: roomType,
      });
    });

  return (
    <>
      <h4>나의 예약 리스트</h4>
      <BootstrapTable
        keyField="name"
        data={getOne}
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
  myInfo: state.myPage.myInfo,
});

export default connect(mapStateToProps, { getMyInfo })(MyPage);
