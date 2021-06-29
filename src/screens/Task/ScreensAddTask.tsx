import React, { useState, useRef, useEffect } from "react";
import { IColumn, ITagSettings, ITask } from "../../types";
import MultipleTagSelect from "../../components/MultipleTagSelect";
import "./index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { tagsState, homeTasksState, dailiesState } from "../../recoil/atoms";
import { initialDaySettings, initialTask } from "../../initialData";
import { v4 as uuidv4 } from "uuid";
import { saveDailies } from "../../api";

enum TaskEditableAttributes {
  TITLE = "title",
  DESCRIPTION = "description",
  TIME = "time",
  DAILYTASK = "dailyTask",
  TAG = "tag",
  TAGS = "tags",
}
const ScreensAddTask: React.FC = () => {
  const [checkTime, setCheckTime] = useState<boolean>(false);
  const [isDailyTask, setIsDailyTask] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>(initialTask);
  const tags = useRecoilValue(tagsState);
  const [tasks, setTasks] = useRecoilState(homeTasksState);
  const [dailies, setDailies] = useRecoilState(dailiesState);
  const [tagsSelected, setTagsSelected] = useState<ITagSettings>({
    tags: tags,
    selected: [],
  });
  const [days, setDays] = useState(initialDaySettings);
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const updateEventHandler = (
    value: any,
    attribute: TaskEditableAttributes
  ) => {
    setTask({ ...task, [attribute]: value });
  };

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
  }, [divRef, checkTime, isDailyTask]);

  useEffect(() => {
    if (task.id === "") setTask({ ...task, id: uuidv4() });
  }, [task]);

  const closePopup = () => {
    const buttons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll("button.closeBtn")
    ) as HTMLButtonElement[];
    buttons.forEach((btn) => btn.click());
  };

  const checkValidTask = (task: ITask) => {
    if (checkTime && task.time === undefined) return false;
    return task.title !== "";
  };

  const addTask = () => {
    if (isDailyTask) {
      if (checkValidTask(task) && days.selected.length > 0) {
        const ntaskList = [...dailies.tasks, task];
        const ncolumn: IColumn[] = [];
        for (let i = 0; i < dailies.columns.length; i++) {
          const col: IColumn = JSON.parse(JSON.stringify(dailies.columns[i]));
          if (days.selected.includes(col.id))
            col.taskIds = [...col.taskIds, task.id];
          ncolumn.push(col);
        }
        const ndailies = { ...dailies, columns: ncolumn, tasks: ntaskList };
        setDailies(ndailies);
        saveDailies(ndailies);
        setTask(initialTask);
        closePopup();
        console.log("finished adding daily task");
        return;
      }
    } else if (checkValidTask(task)) {
      const ncolumn: IColumn = {
        ...tasks.columns[0],
        taskIds: [...tasks.columns[0].taskIds, task.id],
      };
      const ntaskList = [...tasks.tasks, task];
      const ntasks = { ...tasks, columns: [ncolumn], tasks: ntaskList };
      setTasks(ntasks);
      setTask(initialTask);
      closePopup();
      console.log("finished adding task");
      return;
    }
    console.log("nope");
  };
  const handleInputChange = (
    setState: (state: boolean) => void,
    state: boolean
  ) => {
    setState(state);
  };
  useEffect(() => {
    updateEventHandler(tagsSelected.selected, TaskEditableAttributes.TAGS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsSelected.selected]);

  useEffect(() => {
    updateEventHandler(days.selected, TaskEditableAttributes.DAILYTASK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days.selected]);

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
              value={task.title}
              onChange={(event) =>
                updateEventHandler(
                  event.target.value,
                  TaskEditableAttributes.TITLE
                )
              }
              placeholder="TITLE..."
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={task.description}
              onChange={(event) =>
                updateEventHandler(
                  event.target.value,
                  TaskEditableAttributes.DESCRIPTION
                )
              }
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
                value={task.time ?? ""}
                onChange={(event) =>
                  updateEventHandler(
                    event.target.value,
                    TaskEditableAttributes.TIME
                  )
                }
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
                  strokeWidth="2"
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
            <MultipleTagSelect tags={tagsSelected} setTags={setTagsSelected} />
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
            <MultipleTagSelect tags={days} setTags={setDays} />
          </div>
        </div>
        <button className="btn center" onClick={addTask}>
          ADD TASK
        </button>
      </div>
    </>
  );
};
export default ScreensAddTask;
