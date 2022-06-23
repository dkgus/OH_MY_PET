import React, { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getOnlyOnePost, deletePost } from "../../../actions/community";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContentDetail = ({ getOnlyOnePost, post, deletePost }) => {
  const navigate = useNavigate();
  const useParam = useParams();
  const { id, postId } = useParam;

  useEffect(() => {
    getOnlyOnePost({ id, postId });
    console.log("postId", postId);
  }, [getOnlyOnePost]);

  return (
    <>
      {post ? (
        <div>
          <Card>
            <Card.Header
              as="h6"
              style={{ fontWeight: "bold", backgroundColor: "#ffaf2d" }}
            >
              Oh MY Pet :)
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ fontWeight: "bold" }}>{post.title}</Card.Text>
              <div>작성자: {post.user.name}</div>
              <div>{post.content}</div>
              <Button
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e60a2e",
                  color: "#e60a2e",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  let warning = "정말 삭제하시겠습니까? 복구할 수 없습니다!";
                  if (window.confirm(warning)) {
                    deletePost({ id, postId, navigate });
                  } else {
                    alert("취소되었습니다.");
                  }
                }}
              >
                삭제하기
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>없는 글입니다.</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.community.post,
});
export default connect(mapStateToProps, { getOnlyOnePost, deletePost })(
  ContentDetail
);
