import React, { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getOnlyOnePost } from "../../../actions/community";
import Card from "react-bootstrap/Card";

const ContentDetail = ({ getOnlyOnePost, post }) => {
  const useParam = useParams();
  const { id, postId } = useParam;

  useEffect(() => {
    getOnlyOnePost({ id, postId });
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
export default connect(mapStateToProps, { getOnlyOnePost })(ContentDetail);
