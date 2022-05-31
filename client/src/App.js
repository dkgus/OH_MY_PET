import "./App.css";
import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Header />
      <Contents />
    </div>
  );
};

export default App;
