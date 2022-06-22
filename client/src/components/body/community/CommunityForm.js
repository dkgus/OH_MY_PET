import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createPost } from "../../../actions/community";
import { useNavigate } from "react-router-dom";

const CommunityForm = ({ createPost }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createPost({ formData, navigate });
  };
  return (
    <div>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>제목</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="제목을 입력해주세요"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>내용</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={20}
              name="content"
              value={content}
              placeholder="글을 입력해주세요"
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
    </div>
  );
};

export default connect(null, { createPost })(CommunityForm);
