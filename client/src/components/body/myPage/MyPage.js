import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMyInfo } from "../../../actions/myPage";
import Table from "react-bootstrap/Table";
import Moment from "react-moment";

const MyPage = ({ getMyInfo, myInfo }) => {
  /**
   * 들어갈 정보
   * 1. 회원명
   * 2. 회원이 작성한 글
   * 3. 회원의 펫 호텔 예약(유저명,예약 호텔명, 룸타입, 예약시작, 예약끝일, 애완동물명,타입, 예약일)
   * 4. 회원의 이벤트 예약목록
   *    등..
   *
   */
  useEffect(() => {
    console.log("1212");
    console.log("room", myInfo);
    getMyInfo();
  }, [getMyInfo]);

  return (
    <>
      <h5>예약</h5>
      <Table>
        <tr>
          <th>호텔 명</th>
          <th>객실타입</th>
          <th>예약일</th>
          <th>예약신청일</th>
        </tr>
        {myInfo &&
          myInfo.map((item) => {
            console.log("item", item);
            const { hotelName, revStart, revEnd, regDt, roomType } = item;

            return (
              <>
                <tbody>
                  <td>{hotelName}</td>
                  <td>{roomType}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">{revStart}</Moment> ~
                    <Moment format="YYYY/MM/DD">{revEnd}</Moment>
                  </td>
                  <td>
                    <Moment format="YYYY/MM/DD">{regDt}</Moment>
                  </td>
                </tbody>
              </>
            );
          })}
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  myInfo: state.myPage.myInfo,
});

export default connect(mapStateToProps, { getMyInfo })(MyPage);
