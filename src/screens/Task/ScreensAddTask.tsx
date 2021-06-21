import React, { useState, useRef, useEffect } from "react";
import { ITag, ITask } from "../../types";
import MultipleTagSelect from "../../components/MultipleTagSelect";
import "./index.css";

const initialTags: ITag[] = [
  { id: 1, tagName: "a long test tag name here", tagColor: "tomato" },
  { id: 2, tagName: "test tag2", tagColor: "pink" },
  { id: 3, tagName: "test medium long tag3", tagColor: "lightblue" },
  { id: 4, tagName: "test", tagColor: "lightgreen" },
  {
    id: 5,
    tagName: "test long long very long tag long",
    tagColor: "lightblue",
  },
  { id: 6, tagName: "test short", tagColor: "pink" },
];
const initialDays: ITag[] = [
  { id: 1, tagName: "Monday", tagColor: "#e39df9" },
  { id: 2, tagName: "Tuesday", tagColor: "#e39df9" },
  { id: 3, tagName: "Wednesday", tagColor: "#e39df9" },
  { id: 4, tagName: "Thursday", tagColor: "#e39df9" },
  { id: 5, tagName: "Friday", tagColor: "#e39df9" },
  { id: 6, tagName: "Saturday", tagColor: "#e39df9" },
  { id: 7, tagName: "Sunday", tagColor: "#e39df9" },
];
const ScreensAddTask: React.FC = () => {
  const [checkTime, setCheckTime] = useState<boolean>(false);
  const [isDailyTask, setIsDailyTask] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>();
  const [tags, setTags] = useState(initialTags);
  const [days, setDays] = useState(initialDays);
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useEffect(() => {
    if (divRef.current != null) {
      const wrapper: HTMLDivElement = divRef.current;
      const height = [...wrapper.children]
        .map((taskColumn) => {
          const col = taskColumn as HTMLDivElement;
          return col.offsetHeight;
        })
        .reduce((a: number, b: number) => a + b, 0);
      console.log(height, wrapper.offsetHeight);
      if (height > wrapper.offsetHeight - 40) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }
  }, [divRef, checkTime, isDailyTask]);

  const handleInputChange = (
    setState: (state: boolean) => void,
    state: boolean
  ) => {
    setState(state);
  };

  return (
    <>
      <div className="task">
        <div
          className={`taskSection ${isOverflow ? "overflow" : ""}`}
          ref={divRef}
        >
          <div className="inputs">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              ref={null}
              placeholder="TITLE..."
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              ref={null}
              placeholder="DESCRIPTION..."
            />
          </div>
          <div className="inputWrapper">
            <input
              type="checkbox"
              name="checkTime"
              id="checkTime"
              checked={checkTime}
              onChange={(event: any) =>
                handleInputChange(setCheckTime, event.target.checked)
              }
            />
            <label htmlFor="checkTime">check time?</label>
          </div>
          <div hidden={!checkTime}>
            <div className="inputs">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                ref={null}
                placeholder="TIME..."
              />
              <svg
                className="clock"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 11.5C22 17.299 17.299 22 11.5 22C5.70101 22 1 17.299 1 11.5C1 5.70101 5.70101 1 11.5 1C17.299 1 22 5.70101 22 11.5Z"
                  fill="white"
                  stroke="#A4BAF7"
                  stroke-width="2"
                />
                <path
                  d="M14.0556 14.0559C16.6112 16.6114 11.5001 11.5003 11.5001 11.5003C11.5001 9.45586 11.5001 1.27808 11.5001 6.38919"
                  stroke="#707070"
                />
              </svg>
            </div>
          </div>
          <div className="multipleSelectWrapper">
            <label>Tags</label>
            <MultipleTagSelect tags={tags} />
          </div>
          <div className="inputWrapper">
            <input
              type="checkbox"
              name="isDailyTask"
              id="isDailyTask"
              checked={isDailyTask}
              onChange={(event: any) =>
                handleInputChange(setIsDailyTask, event.target.checked)
              }
            />
            <label htmlFor="isDailyTask">is a daily task?</label>
          </div>
          <div className="multipleSelectWrapper" hidden={!isDailyTask}>
            <MultipleTagSelect tags={days} />
          </div>
        </div>
        <button className="btn center">ADD TASK</button>
      </div>
    </>
  );
};
export default ScreensAddTask;
