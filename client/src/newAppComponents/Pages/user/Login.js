import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { commonApi } from "../../utils/commonApi";

const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [info, setInfo] = useState({ email: "", password: "" });

  const { email, password } = info;
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = formRef.current;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    try {
      const res = await commonApi().post("/users/login", info);
      if (res.data.code === 200) {
        localStorage.setItem("token", res.data.token);
        const userInfo = await commonApi().get("/users/login");
        console.log("userInfo", userInfo);
        navigate("/room_reservation_form");
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 402)
      ) {
        setErrorMsg(error.response.data.msg);
      } else {
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="needs-validation"
      noValidate
    >
      <div className="mb-3" controlId="exampleForm.ControlInput1">
        <label>Email</label>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          required
          value={email}
          name="email"
          onChange={(e) => {
            setInfo({ ...info, [e.target.name]: e.target.value });
          }}
          className={`form-control ${
            errorMsg !== "" ||
            (formRef.current?.classList.contains("was-validated") &&
              (email === "" || !email.includes("@")))
              ? "is-invalid"
              : ""
          }`}
        />
        <div className="invalid-feedback">
          {errorMsg || "이메일을 올바르게 입력해주세요!"}
        </div>
      </div>

      <div className="mb-3" controlId="formPlaintextPassword">
        <label>Password</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          required
          name="password"
          value={password}
          onChange={(e) => {
            setInfo({ ...info, [e.target.name]: e.target.value });
          }}
          className={`form-control ${
            errorMsg !== "" ||
            (formRef.current?.classList.contains("was-validated") &&
              password === "")
              ? "is-invalid"
              : ""
          }`}
        />
        <div className="invalid-feedback">
          {errorMsg || "비밀번호를 입력해주세요!"}
        </div>
      </div>

      <Button type="submit">로그인</Button>
    </form>
  );
};

export default Login;
