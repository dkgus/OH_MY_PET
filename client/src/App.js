import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import setTokenToLocal from "./utils/setTokenToLocal";

import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import Footer from "./components/footer/Footer";
import Login from "./components/body/login/Login";
import RoomReservation from "./components/body/room/RoomReservation";
import RoomList from "./components/body/room/RoomList";
import RoomForm from "./components/body/room/RoomForm";
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
          <Routes>
            <Route path="/" element={<Contents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/room_reservation" element={<RoomReservation />} />
            <Route path="/room_list/:id" element={<RoomList />} />
            <Route path="/room_reserve/:id" element={<RoomForm />} />
          </Routes>
        </Router>
        <Footer />
      </Provider>
    </div>
  );
};

export default App;
