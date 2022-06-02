import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Header />
      <Contents />
      <Footer />
    </div>
  );
};

export default App;
