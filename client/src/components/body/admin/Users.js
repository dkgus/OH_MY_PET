import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsersInfo } from "../../../actions/admin";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const columns = [
  { dataField: "name", text: "회원명" },
  { dataField: "email", text: "이메일" },
  { dataField: "nickname", text: "반려동물 이름" },
  { dataField: "type", text: "반려동물 타입" },
  { dataField: "phone", text: "휴대폰 번호" },
  { dataField: "role", text: "회원등급" },
];

const Users = ({ getAllUsersInfo, allUser }) => {
  let userArr = [];
  useEffect(() => {
    getAllUsersInfo();
  }, [getAllUsersInfo]);

  allUser &&
    allUser.map((item) => {
      const { role, name, nickname, email, phone, type, _id } = item;
      userArr.push({
        _id: _id,
        name: name,
        role: role,
        nickname: nickname,
        email: email,
        phone: phone,
        type: type,
      });
    });

  return (
    <>
      <h5 style={{ fontWeight: "bold" }}>전체 회원 조회</h5>
      <BootstrapTable
        keyField="name"
        data={userArr}
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
  allUser: state.admin.users,
});
export default connect(mapStateToProps, { getAllUsersInfo })(Users);
