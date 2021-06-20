import React from "react";
import { ScreensType } from "../../types";
import "./index.css";

const ScreensNewTask: React.FC<ScreensType> = ({ hidden }) => {
  return (
    <div className="task" hidden={hidden}>
      <p>placeholder</p>
    </div>
  );
};
export default ScreensNewTask;
