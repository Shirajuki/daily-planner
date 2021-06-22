import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { tagsState } from "../../recoil/atoms";
import { ITag, ScreensEditType } from "../../types";
import "./index.css";

const ScreensEditTag: React.FC<ScreensEditType> = ({ task, taskIds }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [tag, setTag] = useState<ITag>(task?.tag ?? ({} as ITag));
  const [tags, setTags] = useRecoilState(tagsState);

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

  const editTag = () => {
    const ntags: ITag[] = [...tags.filter((t: ITag) => t.id !== tag.id), tag];
    ntags.sort((a, b) => {
      const indA = taskIds?.indexOf(a.id) ?? 0;
      const indB = taskIds?.indexOf(b.id) ?? 0;
      return indA - indB;
    });
    setTags(ntags);
    const btn: HTMLButtonElement = document.querySelector(
      "button.closeBtn"
    ) as HTMLButtonElement;
    btn.click();
  };

  const handleInputChange = (tagName: string) => {
    if (tag) {
      const ntag: ITag = { ...tag, tagName: tagName };
      setTag(ntag);
    }
  };

  const handleColorChange = (ncolor: string) => {
    if (tag.tagColor) {
      const ntag: ITag = { ...tag, tagColor: ncolor };
      setTag(ntag);
    }
  };

  useEffect(() => {
    const label: HTMLLabelElement = document.getElementById(
      "color2"
    ) as HTMLLabelElement;
    label.style.backgroundColor = tag.tagColor;
  }, [tag.tagColor]);
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
              value={tag.tagName}
              onChange={(event: any) => handleInputChange(event.target.value)}
              placeholder="TAGNAME..."
            />
            <div className="colorWrapper">
              <label htmlFor="colorLabel">Color</label>
              <input
                className="colorInput"
                type="text"
                id="colorLabel"
                name="colorLabel"
                value={tag.tagColor}
                readOnly
              />
              <div className="colors colorInput">
                <input
                  type="color"
                  name="colorTag2"
                  id="colorTag2"
                  value={tag.tagColor}
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
        <button className="btn center" onClick={editTag}>
          EDIT TAG
        </button>
      </div>
    </>
  );
};
export default ScreensEditTag;
