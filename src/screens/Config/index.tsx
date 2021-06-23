import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { themeState } from "../../recoil/atoms";
import { ScreensType } from "../../types";
import "./index.css";

const ScreensConfig: React.FC<ScreensType> = ({ hidden }) => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
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
      <button className="btn">CLEAR DATA</button>
    </div>
  );
};
export default ScreensConfig;
