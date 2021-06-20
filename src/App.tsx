import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import ScreensHome from "./screens/Home";
import ScreensDailies from "./screens/Dailies";
import ScreensTags from "./screens/Tags";
import ScreensConfig from "./screens/Config";
import "./App.css";

const App: React.FC = () => {
  const [selected, setSelected] = useState<number>(3);
  const [popup, setPopup] = useState<boolean>(false);
  useEffect(() => {
    if (selected == 3) setPopup(true);
    else if (popup) setPopup(false);
  }, [selected]);
  return (
    <div className="App">
      <ScreensHome hidden={selected !== 0 && selected !== 3} />
      <ScreensDailies hidden={selected !== 1} />
      <ScreensTags hidden={selected !== 2} />
      <Popup
        isFullscreen={true}
        shown={popup}
        closeEvent={() => setSelected(0)}
        children={<ScreensConfig hidden={selected !== 3} />}
        title={"Configuration"}
      />
      <Footer selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default App;
