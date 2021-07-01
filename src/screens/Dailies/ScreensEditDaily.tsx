import React, { useEffect, useRef, useState } from "react";
import {
  IColumn,
  ITagSettings,
  ITask,
  ITodoColumn,
  ScreensEditType,
} from "../../types";
import MultipleTagSelect from "../../components/MultipleTagSelect";
import { useRecoilState, useRecoilValue } from "recoil";
import { tagsState, dailiesState } from "../../recoil/atoms";
import { initialDaySettings } from "../../initialData";
import "./index.css";
import { dailiesSelectorState } from "../../recoil/selectors";
import { saveDailies } from "../../api";

enum TaskEditableAttributes {
  TITLE = "title",
  DESCRIPTION = "description",
  TIME = "time",
  DAILYTASK = "dailyTask",
  TAG = "tag",
  TAGS = "tags",
}
const ScreensEditDaily: React.FC<ScreensEditType> = ({
  task: initialTask,
  taskIds: _,
  deleteEventHandler,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>(initialTask);
  const [dailies, setDailies] = useRecoilState(dailiesState);
  const tags = useRecoilValue(tagsState);
  const dailiesSelector = useRecoilValue(dailiesSelectorState);
  const [days, setDays] = useState(initialDaySettings);
  const [checkTime, setCheckTime] = useState<boolean>(
    initialTask?.time !== undefined
  );
  const [tagsSelected, setTagsSelected] = useState<ITagSettings>({
    tags: tags,
    selected: task.tags ?? [],
  });
  const updateEventHandler = (
    value: any,
    attribute: TaskEditableAttributes
  ) => {
    setTask({ ...task, [attribute]: value });
  };
  const updateEventHandlerRef = useRef(updateEventHandler);

  useEffect(() => {
    const checkedDays: string[] = task?.dailyTask ?? [];
    const ndays: ITagSettings = { ...days, selected: checkedDays };
    setDays(ndays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailiesSelector.tasks[0].dailyTask]);

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

  const closePopup = () => {
    const buttons: HTMLButtonElement[] = Array.from(
      document.querySelectorAll("button.closeBtn")
    ) as HTMLButtonElement[];
    buttons.forEach((btn) => btn.click());
  };

  const checkValidTask = (task: ITask) => {
    return task.title !== "" && (task?.dailyTask?.length ?? -1) > 0;
  };
  const editTask = () => {
    if (checkValidTask(task)) {
      const ntaskList = [
        ...dailies.tasks.filter((t: ITask) => t.id !== task.id),
        task,
      ];
      const columns: IColumn[] = JSON.parse(JSON.stringify(dailies.columns));
      const nColumns: IColumn[] = [];
      for (let i = 0; i < columns.length; i++) {
        const col: IColumn = columns[i];
        col.taskIds = col.taskIds.filter((id: string) => id !== task.id);
        if (task?.dailyTask?.includes(col.id))
          col.taskIds = [...col.taskIds, task.id];
        nColumns.push(col);
      }
      const ntasks: ITodoColumn = {
        ...dailies,
        columns: nColumns,
        tasks: ntaskList,
      };
      setDailies(ntasks);
      saveDailies(ntasks);
      closePopup();
      console.log("finished editing");
    } else {
      console.log("nope");
    }
  };

  useEffect(() => {
    updateEventHandlerRef.current(
      tagsSelected.selected,
      TaskEditableAttributes.TAGS
    );
  }, [tagsSelected.selected]);

  useEffect(() => {
    updateEventHandlerRef.current(
      days.selected,
      TaskEditableAttributes.DAILYTASK
    );
  }, [days.selected]);

  return (
    <>
      <div className="task">
        <div
          className={`taskSection small ${isOverflow ? "overflow" : ""}`}
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
              onChange={(event: any) => setCheckTime(event.target.checked)}
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
          <label>Daily task:</label>
          <div className="multipleSelectWrapper">
            <MultipleTagSelect tags={days} setTags={setDays} />
          </div>
        </div>
        <button
          className="btn center delete"
          onClick={() => {
            if (deleteEventHandler) {
              deleteEventHandler(task);
              closePopup();
            }
          }}
        >
          DELETE DAILY TASK
        </button>
        <button className="btn center" onClick={editTask}>
          EDIT DAILY TASK
        </button>
      </div>
    </>
  );
};
export default ScreensEditDaily;
