import React, { useState } from "react";
import Footer from "./components/Footer";
import ScreensHome from "./screens/Home";
import ScreensDailies from "./screens/Dailies";
import ScreensTags from "./screens/Tags";
import "./App.css";

const App: React.FC = () => {
  const [selected, setSelected] = useState(1);
  return (
    <div className="App">
      <ScreensHome hidden={selected !== 0 && selected !== 3} />
      <ScreensDailies hidden={selected !== 1} />
      <ScreensTags hidden={selected !== 2} />
      <Footer selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default App;
