import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import ScreensHome from "./screens/Home";
import ScreensDailies from "./screens/Dailies";
import ScreensTags from "./screens/Tags";
import ScreensConfig from "./screens/Config";
import { ScreensAddTask, ScreensEditTask } from "./screens/Task";
import "./App.css";

const App: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(true);
  const [popupScreen, setPopupScreen] = useState<number>(1);
  const popupScreenTitles = (num: number) => {
    switch (num) {
      case 0:
        return "Configuration";
      case 1:
        return "Add new task";
      case 2:
        return "Edit task";
      default:
        return "";
    }
  };
  useEffect(() => {
    if (selected === 3) {
      setPopup(true);
      setPopupScreen(0);
    }
    // else if (popup) setPopup(false);
  }, [selected]);
  const openPopupScreen = (num: number) => {
    setPopupScreen(num);
    setPopup(true);
  };
  return (
    <div className="App">
      <ScreensHome hidden={selected !== 0 && selected !== 3} />
      <ScreensDailies hidden={selected !== 1} />
      <ScreensTags hidden={selected !== 2} />
      <Popup
        isFullscreen={true}
        shown={popup}
        closeEvent={() => {
          if (selected === 3) setSelected(0);
          setPopup(false);
        }}
        children={
          <>
            <ScreensConfig
              hidden={!popup || selected !== 3 || popupScreen !== 0}
            />
            {popup && popupScreen === 1 ? <ScreensAddTask /> : <></>}
            {popup && popupScreen === 2 ? <ScreensEditTask /> : <></>}
          </>
        }
        title={popupScreenTitles(popupScreen)}
      />
      <Footer
        selected={selected}
        setSelected={setSelected}
        setPopupScreen={openPopupScreen}
      />
    </div>
  );
};

export default App;
