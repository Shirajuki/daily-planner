import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  dailiesState,
  tagsState,
  tasksState,
  themeState,
} from "../../recoil/atoms";
import { ScreensType } from "../../types";
import Popup from "../../components/Popup";
import { loadDailies, loadTags, loadTasks } from "../../api";
import { saveTheme } from "../../api";
import "./index.css";

const ScreensConfig: React.FC<ScreensType> = ({ hidden }) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [darkmode, setDarkmode] = useState<boolean>(
    theme === "dark" ? true : false
  );
  const [popup, setPopup] = useState<boolean>(false);
  const setDailies = useSetRecoilState(dailiesState);
  const setTasks = useSetRecoilState(tasksState);
  const setTags = useSetRecoilState(tagsState);
  const handleInputChange = (
    setState: (state: boolean) => void,
    state: boolean
  ) => {
    setState(state);
  };
  useEffect(() => {
    if (theme === "dark") setDarkmode(true);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (darkmode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [darkmode, setTheme]);
  return (
    <div className="config" hidden={hidden}>
      <div className="inputWrapper">
        <input
          type="checkbox"
          name="darkmode"
          id="darkmode"
          checked={darkmode}
          onChange={(event: any) =>
            handleInputChange(setDarkmode, event.target.checked)
          }
        />
        <label htmlFor="darkmode">dark mode</label>
      </div>
      <div className="inputWrapper">
        <input
          type="checkbox"
          name="other"
          id="other"
          checked={darkmode}
          onChange={(event: any) => {
            handleInputChange(setDarkmode, event.target.checked);
          }}
        />
        <label htmlFor="other">some other stuff</label>
      </div>
      <button className="btn" onClick={() => setPopup(true)}>
        CLEAR DATA
      </button>
      <Popup
        isFullscreen={false}
        shown={popup}
        children={
          popup ? (
            <div className="popupWrapper center">
              <h1 className="title">R YOU SURE?</h1>
              <p>Action: CLEAR DATA</p>
              <button className="btn delete" onClick={() => setPopup(false)}>
                NO
              </button>
              <button
                className="btn"
                onClick={() => {
                  localStorage.removeItem("djukip-tasks");
                  localStorage.removeItem("djukip-tags");
                  localStorage.removeItem("djukip-dailies");
                  setTags(loadTags());
                  setTasks(loadTasks());
                  setDailies(loadDailies());
                  setPopup(false);
                }}
              >
                YES
              </button>
            </div>
          ) : (
            <></>
          )
        }
        closeEvent={() => ""}
      />
    </div>
  );
};
export default ScreensConfig;
