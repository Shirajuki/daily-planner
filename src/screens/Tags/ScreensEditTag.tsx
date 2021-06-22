import React, { useState, useRef, useEffect } from "react";
import { ScreensEditType } from "../../types";
import "./index.css";

const ScreensEditTag: React.FC<ScreensEditType> = ({ task }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000000");

  useEffect(() => {
    if (divRef.current != null) {
      const wrapper: HTMLDivElement = divRef.current;
      const height = [...wrapper.children]
        .map((taskColumn) => {
          const col = taskColumn as HTMLDivElement;
          return col.offsetHeight;
        })
        .reduce((a: number, b: number) => a + b, 0);
      if (height > wrapper.offsetHeight - 40) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }
  }, [divRef]);

  const handleInputChange = (
    setState: (state: boolean) => void,
    state: boolean
  ) => {
    setState(state);
  };

  const handleColorChange = (ncolor: string) => {
    if (color) {
      const label: HTMLLabelElement = document.getElementById(
        "color2"
      ) as HTMLLabelElement;
      label.style.backgroundColor = ncolor;
      setColor(ncolor);
    }
  };
  console.log(task);
  return (
    <>
      <div className="task">
        <div
          className={`taskSection small ${isOverflow ? "overflow" : ""}`}
          ref={divRef}
        >
          <div className="inputs">
            <label htmlFor="tagname">Tagname</label>
            <input
              type="text"
              id="tagname"
              name="tagname"
              ref={null}
              placeholder="TAGNAME..."
            />
            <div className="colorWrapper">
              <label htmlFor="colorLabel">Color</label>
              <input
                className="colorInput"
                type="text"
                id="colorLabel"
                name="colorLabel"
                value={color}
                readOnly
              />
              <div className="colors colorInput">
                <input
                  type="color"
                  name="colorTag2"
                  id="colorTag2"
                  value={color}
                  onChange={(event: any) =>
                    handleColorChange(event.target.value)
                  }
                />
                <label htmlFor="colorTag2" id="color2"></label>
              </div>
            </div>
          </div>
        </div>
        <button className="btn center delete">DELETE TAG</button>
        <button className="btn center">EDIT TAG</button>
      </div>
    </>
  );
};
export default ScreensEditTag;
