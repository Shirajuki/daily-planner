import React, { useState, useEffect, useRef } from "react";
import DroppableList from "../../components/DroppableList";
import { ITag, ITodoColumn, ScreensType } from "../../types";
import "./index.css";

const initialTag: ITag[] = [
  { id: 1, tagName: "test tag1", tagColor: "tomato" },
  { id: 2, tagName: "test tag2", tagColor: "pink" },
  { id: 3, tagName: "test tag3", tagColor: "lightblue" },
  { id: 4, tagName: "test tag4", tagColor: "lightgreen" },
];
const initialData: ITodoColumn = {
  tasks: [
    { id: 0, content: "TAG NAME 1", tag: initialTag[0] },
    { id: 1, content: "TAG NAME 2", tag: initialTag[1] },
    { id: 2, content: "TAG NAME 3", tag: initialTag[2] },
    { id: 3, content: "TAG NAME 4", tag: initialTag[3] },
  ],
  columns: [
    {
      id: 0,
      title: "Tags",
      taskIds: [0, 1, 2, 3],
    },
  ],
  columnOrder: [0],
};
const ScreensTags: React.FC<ScreensType> = ({ hidden }) => {
  const [rerender, setRerender] = useState(false);
  const tagnameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hidden) setRerender(true);
  }, [hidden]);

  useEffect(() => {
    if (colorRef.current) {
      // Generate default pastel colors on load
      const color = `hsl(${Math.floor(Math.random() * 255) + 1}, 50%, 75%)`;
      colorRef.current.value = color;
      handleColorChange(color);
    }
  }, [colorRef]);

  const handleColorChange = (color: string) => {
    if (colorRef.current) {
      const label: HTMLLabelElement = document.getElementById(
        "color"
      ) as HTMLLabelElement;
      label.style.backgroundColor = color;
    }
  };
  console.log("rerender");
  return (
    <div className="tags simpleScreen" hidden={hidden}>
      <div className="topBackground topSimple">
        <div className="title">
          <svg
            width="18"
            height="16"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.50061 2.08579L13.5006 8.08579V12.2928C13.5006 12.6906 13.3426 13.0721 13.0613 13.3534C12.78 13.6348 12.3984 13.7928 12.0006 13.7928H3.00061C2.60279 13.7928 2.22125 13.6348 1.93995 13.3534C1.65865 13.0721 1.50061 12.6906 1.50061 12.2928V8.08579L7.50061 2.08579ZM12.5006 1.29279V4.79279L10.5006 2.79279V1.29279C10.5006 1.16018 10.5533 1.033 10.6471 0.939232C10.7408 0.845464 10.868 0.792786 11.0006 0.792786H12.0006C12.1332 0.792786 12.2604 0.845464 12.3542 0.939232C12.4479 1.033 12.5006 1.16018 12.5006 1.29279Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.79363 0.292786C6.98116 0.105315 7.23547 0 7.50063 0C7.7658 0 8.0201 0.105315 8.20763 0.292786L14.8546 6.93879C14.9485 7.03267 15.0013 7.16001 15.0013 7.29279C15.0013 7.42556 14.9485 7.5529 14.8546 7.64679C14.7607 7.74067 14.6334 7.79342 14.5006 7.79342C14.3679 7.79342 14.2405 7.74067 14.1466 7.64679L7.50063 0.999786L0.854632 7.64679C0.760745 7.74067 0.633407 7.79342 0.500632 7.79342C0.367856 7.79342 0.240518 7.74067 0.146632 7.64679C0.052745 7.5529 0 7.42556 0 7.29279C0 7.16001 0.052745 7.03267 0.146632 6.93879L6.79363 0.292786Z"
              fill="white"
            />
          </svg>
          <h1>Tags</h1>
        </div>
        <h2>today's date</h2>
        <p>June 15, 2021</p>
      </div>
      <div className="newTagBox">
        <div className="inputs">
          <label htmlFor="newTag">Tagname</label>
          <input
            type="text"
            name="newTag"
            id="newTag"
            ref={tagnameRef}
            placeholder="ADD NEW TAG..."
          />
        </div>
        <div className="colors">
          <input
            type="color"
            name="colorTag"
            id="colorTag"
            ref={colorRef}
            onChange={(event: any) => handleColorChange(event.target.value)}
          />
          <label htmlFor="colorTag" id="color"></label>
          <button>ADD</button>
        </div>
      </div>
      <DroppableList
        rerender={rerender}
        data={initialData}
        showTitle={false}
        hasEmptyString={"no tasks scheduled this day..."}
        showDeleteBtn={true}
        hasBigTag={true}
      />
    </div>
  );
};
export default ScreensTags;
