import React, { ReactNode } from "react";
import "./index.css";

type PopupType = {
  isFullscreen: boolean;
  shown: boolean;
  children: ReactNode;
  closeEvent: () => void;
  title?: string;
};
const Popup: React.FC<PopupType> = ({
  isFullscreen,
  shown,
  children,
  closeEvent,
  title,
}) => {
  const handleCloseEvent = () => {
    if (!isFullscreen) closeEvent();
  };
  return (
    <>
      <div className={`eventBlocker ${shown ? "shown" : ""}`}></div>
      <div
        className={`popup ${shown ? "shown" : ""} ${
          isFullscreen ? "fullscreen" : ""
        }`}
        onClick={handleCloseEvent}
      >
        <button className="closeBtn" onClick={closeEvent}>
          <svg
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 11H26M2 11L11 1M2 11L11 21"
              stroke="#F7DAF8"
              strokeWidth="2"
            />
          </svg>
        </button>
        <h1 className="title">{title ?? ""}</h1>
        {children}
      </div>
    </>
  );
};
export default Popup;
