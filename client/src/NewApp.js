import React from "react";
import { Container, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./newAppComponents/Pages/Main";
import Login from "./newAppComponents/Pages/user/Login";
import RoomReservationForm from "./newAppComponents/Pages/room/RoomReservationForm";

const NewApp = () => {
  return (
    <Container>
      <Router>
        <Row>헤더</Row>
        <Row>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/room_reservation_form"
              element={<RoomReservationForm />}
            />
            {/* 404 리다이렉트 처리 */}
            {/* <Route path="/*" element={<Navigate to="/"></Navigate>}></Route> */}
          </Routes>
        </Row>
      </Router>
    </Container>
  );
};

export default NewApp;
