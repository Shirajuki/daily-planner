import React, { useState } from "react";
import { ScreensType } from "../../types";
import "./index.css";

const ScreensConfig: React.FC<ScreensType> = ({ hidden }) => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const handleInputChange = (
    setState: (state: boolean) => void,
    state: boolean
  ) => {
    setState(state);
  };
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
