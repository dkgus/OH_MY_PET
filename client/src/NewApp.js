import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./newAppComponents/Pages/Main";
import Login from "./newAppComponents/Pages/user/Login";
import RoomReservationForm from "./newAppComponents/Pages/room/RoomReservationForm";
import Header from "./newAppComponents/Header/Header";
import { useSelector } from "react-redux";

const NewApp = () => {
  const LOGIN_STATUS = useSelector((state) => state.auth.isLogin);

  return (
    <Container>
      <Router>
        {LOGIN_STATUS ? (
          <>
            <Row>
              <Header />
            </Row>
            <Row>
              <Routes>
                <>
                  <Route exact path="/" element={<Main />} />
                  <Route
                    exact
                    path="/room_reservation_form"
                    element={<RoomReservationForm />}
                  />
                  {/* 404 리다이렉트 처리 */}
                  {/* <Route path="/*" element={<Navigate to="/"></Navigate>}></Route> */}
                </>
              </Routes>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Header />
            </Row>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </>
        )}
      </Router>
    </Container>
  );
};

export default NewApp;
