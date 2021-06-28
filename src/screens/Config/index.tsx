import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { themeState } from "../../recoil/atoms";
import { ScreensType } from "../../types";
import Popup from "../../components/Popup";
import "./index.css";

const ScreensConfig: React.FC<ScreensType> = ({ hidden }) => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const setTheme = useSetRecoilState(themeState);
  const handleInputChange = (
    setState: (state: boolean) => void,
    state: boolean
  ) => {
    setState(state);
  };
  useEffect(() => {
    if (darkmode) setTheme("dark");
    else setTheme("light");
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
          onChange={(event: any) =>
            handleInputChange(setDarkmode, event.target.checked)
          }
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
