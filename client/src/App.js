import "./App.css";
import Header from "./components/header/Header";
import Contents from "./components/body/Contents";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Header />
      <Contents />
    </div>
  );
};

export default App;
