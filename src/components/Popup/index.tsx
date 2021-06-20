import React from "react";

type PopupType = {
  isFullscreen: boolean;
  child: React.FC<any>;
};
const Popup: React.FC<PopupType> = ({ isFullscreen, child }) => {
  return (
    <div>
      <p>this is a test</p>
    </div>
  );
};
export default Popup;
