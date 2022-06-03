import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import Footer from "./components/footer/Footer";
import Login from "./components/body/login/Login";
import RoomReservation from "./components/body/room/RoomReservation";
import RoomList from "./components/body/room/RoomList";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
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
          </Routes>
        </Router>
        <Footer />
      </Provider>
    </div>
  );
};

export default App;
