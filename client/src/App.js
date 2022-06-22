import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import setTokenToLocal from "./utils/setTokenToLocal";

import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import Footer from "./components/footer/Footer";
import Alert from "./components/alert/Alert";
import Login from "./components/body/login/Login";
import RoomReservation from "./components/body/room/RoomReservation";
import RoomList from "./components/body/room/RoomList";
import RoomForm from "./components/body/room/RoomForm";
import MyPage from "./components/body/myPage/MyPage";
import EditRoom from "./components/body/myPage/EditRoom";
import EventReservation from "./components/body/event/EventReservation";
import EventForm from "./components/body/event/EventForm";
import EditEvent from "./components/body/myPage/EditEvent";
import Community from "./components/body/community/Community";
import ContentDetail from "./components/body/community/ContentDetail";

import PrivateRoute from "./components/privateRouting/PrivateRouting";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setTokenToLocal(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Provider store={store}>
        <Router>
          <Header />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Contents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/my_page/:id" element={<MyPage />} />
            <Route path="/my_page/:id/:editIndex" element={<EditRoom />} />
            <Route
              path="/my_page_event/:id/:editIndex"
              element={<EditEvent />}
            />
            <Route path="/room_reservation" element={<RoomReservation />} />
            <Route path="/room_list/:id" element={<RoomList />} />
            <Route path="/room_reserve/:id" element={<RoomForm />} />
            <Route path="/event_reservation" element={<EventReservation />} />
            <Route path="/event_reservation/form" element={<EventForm />} />
            <Route path="/community/list" element={<Community />} />
            <Route
              path="/community/list/:id/:postId"
              element={<ContentDetail />}
            />
          </Routes>
        </Router>
        <Footer />
      </Provider>
    </div>
  );
};

export default App;
