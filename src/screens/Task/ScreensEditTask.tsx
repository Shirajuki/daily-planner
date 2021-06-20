import React from "react";
import { ScreensType } from "../../types";
import "./index.css";

const ScreensEditTask: React.FC<ScreensType> = ({ hidden }) => {
  return (
    <div className="task" hidden={hidden}>
      <p>placeholder</p>
    </div>
  );
};
export default ScreensEditTask;
