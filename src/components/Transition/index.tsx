import React, { useEffect } from "react";
import "./index.css";

type TransitionType = {
  shown: boolean;
  setShown: (shown: boolean) => void;
};
const Transition: React.FC<TransitionType> = ({ shown, setShown }) => {
  useEffect(() => {
    if (shown) {
      const timer = setTimeout(() => setShown(false), 800);
      return () => clearTimeout(timer);
    }
  }, [shown, setShown]);
  return (
    <div className={`transitionWrapper ${!shown ? "hidden" : ""}`}>
      <div className="circle"></div>
    </div>
  );
};
export default Transition;
