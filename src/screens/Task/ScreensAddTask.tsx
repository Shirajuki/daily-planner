import React from "react";
import { ScreensType } from "../../types";
import "./index.css";

const ScreensAddTask: React.FC<ScreensType> = ({ hidden }) => {
  return (
    <div className="task" hidden={hidden}>
      <p>placeholder 1</p>
    </div>
  );
};
export default ScreensAddTask;
