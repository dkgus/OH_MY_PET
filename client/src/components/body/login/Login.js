import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log("formData", formData);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div
        className="login_form"
        style={{
          width: "70%",
          margin: "0 auto",
          border: "3px solid #f7f4f0",
          backgroundColor: "#f7f4f0",
          borderRadius: 10,
          padding: 50,
          height: "600px",
          marginBottom: 50,
        }}
      >
        <h3 style={{ fontWeight: "bold", color: "#ffaf2d", paddingBottom: 30 }}>
          Login
        </h3>

        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={(e) => onChange(e)}
          >
            <Form.Label style={{ fontWeight: "bold" }}>Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              이메일 양식으로 작성해주세요.
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={(e) => onChange(e)}
          >
            <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">6자 이상 입력해주세요.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="아이디 저장하기" />
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
    </>
  );
};
