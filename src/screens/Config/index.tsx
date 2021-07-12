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

const themes: string[] = [
  "default",
  "dragon_alumni",
  "peko_shachou",
  "rushia_boing_boing",
];
const ScreensConfig: React.FC<ScreensType> = ({ hidden }) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [darkmode, setDarkmode] = useState<boolean>(
    theme.scheme === "dark" ? true : false
  );
  const [themeColor, setThemeColor] = useState<string>(
    theme.themeColor ?? "default"
  );
  const [popup, setPopup] = useState<boolean>(false);
  const setDailies = useSetRecoilState(dailiesState);
  const setTasks = useSetRecoilState(tasksState);
  const setTags = useSetRecoilState(tagsState);
  useEffect(() => {
    if (theme.scheme === "dark") setDarkmode(true);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (darkmode && theme.scheme !== "dark") {
      setTheme({ ...theme, scheme: "dark" });
    } else if (!darkmode && theme.scheme !== "light") {
      setTheme({ ...theme, scheme: "light" });
    }
  }, [darkmode, setTheme, theme]);

  useEffect(() => {
    if (themeColor !== theme.themeColor)
      setTheme({ ...theme, themeColor: themeColor });
  }, [themeColor, setTheme, theme]);
  return (
    <div className="config" hidden={hidden}>
      <h3>Scheme</h3>
      <div className="inputWrapper">
        <input
          type="checkbox"
          name="darkmode"
          id="darkmode"
          checked={darkmode}
          onChange={(event: any) => setDarkmode(event.target.checked)}
        />
        <label htmlFor="darkmode">dark mode</label>
      </div>

      <h3>Theme color</h3>
      {themes.map((thm: string, index: number) => (
        <div className="inputWrapper" key={thm + index}>
          <input
            type="checkbox"
            name={thm}
            id={thm}
            checked={themeColor === thm}
            onChange={() => {
              setThemeColor(thm);
            }}
          />
          <label htmlFor={thm}>{thm}</label>
        </div>
      ))}
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
