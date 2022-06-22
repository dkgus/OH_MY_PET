import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/community";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const columns = [
  { dataField: "title", text: "제목" },
  { dataField: "content", text: "내용" },
  { dataField: "writer", text: "작성자" },
  { dataField: "type", text: "반려동물 타입" },
  { dataField: "createdAt", text: "작성일" },
  { dataField: "modifiedAt", text: "수정일" },
];

const Community = ({ getPosts, posts }) => {
  const getCommunityData = [];
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      const postId = row._id;
      const userId = row.user._id;
      //console.log("row", row._id);
      //console.log("row2", row.user._id);
      window.location.href = `/community/list/${userId}/${postId}`;
    },
  };

  posts &&
    posts.map((item) => {
      const { content, title, user, _id, createdAt, modifiedAt } = item;
      let momentCreate = <Moment format="YYYY/MM/DD">{createdAt}</Moment>;
      let momentModifie = <Moment format="YYYY/MM/DD">{modifiedAt}</Moment>;
      getCommunityData.push({
        _id: _id,
        user: user,
        content: content,
        title: title,
        writer: user.name,
        type: user.type,
        createdAt: momentCreate,
        modifiedAt: momentModifie,
      });
    });

  return (
    <>
      <span
        style={{
          backgroundColor: "#ffaf2d",
          padding: "10px 30px",
          borderRadius: 10,
          fontWeight: "bold",
          display: "inline-block",
          marginBottom: 35,
        }}
      >
        <Link
          to="/community/form"
          style={{ textDecoration: "none", color: "black" }}
        >
          글작성하기
        </Link>
      </span>
      <BootstrapTable
        keyField="name"
        data={getCommunityData}
        columns={columns}
        pagination={paginationFactory()}
        bordered={false}
        hover={true}
        rowStyle={{ backgroundColor: "white" }}
        rowEvents={tableRowEvents}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.community.posts,
});

export default connect(mapStateToProps, { getPosts })(Community);
