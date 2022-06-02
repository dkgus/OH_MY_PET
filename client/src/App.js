import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import Footer from "./components/footer/Footer";
import { Login } from "./components/body/login/Login";

const App = () => {
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Contents />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
