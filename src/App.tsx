import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import ScreensHome from "./screens/Home";
import ScreensDailies from "./screens/Dailies";
import ScreensTags from "./screens/Tags";
import ScreensConfig from "./screens/Config";
import { ScreensAddTask } from "./screens/Task";
import Transition from "./components/Transition";
import "./App.css";
import { themeState } from "./recoil/atoms";

const App: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);
  const [popupScreen, setPopupScreen] = useState<number>(0);
  const transitionRef = useRef<boolean>(false);
  const selectedOldRef = useRef<number>(selected);
  const theme = useRecoilValue(themeState);

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
  const openPopupScreen = (num: number) => {
    setPopupScreen(num);
    setPopup(true);
    transitionRef.current = false;
  };
  useEffect(() => {
    if (selected === 3) {
      openPopupScreen(0);
    } else if (selectedOldRef.current !== 3) {
      setTransition(true);
    } else {
      transitionRef.current = true;
    }
  }, [selected]);

  useEffect(() => {
    if (selectedOldRef.current === 3) transitionRef.current = false;
    else if (!transition) {
      transitionRef.current = true;
    } else transitionRef.current = false;
  }, [transition]);

  const setSelectedHandler = (num: number) => {
    selectedOldRef.current = selected;
    setSelected(num);
    transitionRef.current = true;
  };
  const hiddenScreen = (num: number) => {
    if (selected === 3) {
      return !(selectedOldRef.current === num);
    } else if (selected !== num || transitionRef.current) {
      return true;
    }
    return false;
  };

  return (
    <div className={`App ${theme}`}>
      <Transition shown={transition} setShown={setTransition} />
      <ScreensHome hidden={hiddenScreen(0)} />
      <ScreensDailies hidden={hiddenScreen(1)} />
      <ScreensTags hidden={hiddenScreen(2)} />
      <Popup
        isFullscreen={true}
        shown={popup}
        closeEvent={() => {
          if (selected === 3) setSelectedHandler(selectedOldRef.current);
          setPopup(false);
          transitionRef.current = false;
        }}
        children={
          <>
            <ScreensConfig
              hidden={!popup || selected !== 3 || popupScreen !== 0}
            />
            {popup && popupScreen === 1 ? <ScreensAddTask /> : <></>}
          </>
        }
        title={popupScreenTitles(popupScreen)}
      />
      <Footer
        selected={selected}
        setSelected={setSelectedHandler}
        setPopupScreen={openPopupScreen}
      />
    </div>
  );
};

export default App;
