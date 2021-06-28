import React, { useEffect, useRef, useState } from "react";
import { ITagSettings, ITask, ScreensEditType } from "../../types";
import MultipleTagSelect from "../../components/MultipleTagSelect";
import { useRecoilState, useRecoilValue } from "recoil";
import { tagsState, homeTasksState } from "../../recoil/atoms";
import { initialDaySettings } from "../../initialData";
import "./index.css";

export enum TaskEditableAttributes {
  TITLE = "title",
  DESCRIPTION = "description",
  TIME = "time",
  DAILYTASK = "dailyTask",
  TAG = "tag",
  TAGS = "tags",
}
const ScreensEditDaily: React.FC<ScreensEditType> = ({
  task: initialTask,
  taskIds,
  deleteEventHandler,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>(initialTask);
  const [tasks, setTasks] = useRecoilState(homeTasksState);
  const tags = useRecoilValue(tagsState);
  const [days, setDays] = useState(initialDaySettings);
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
    return task.title !== "";
  };
  const editTask = () => {
    if (checkValidTask(task)) {
      const ntaskList = tasks.tasks.filter((t: ITask) => t.id !== task.id);
      const ntasks = { ...tasks, tasks: [...ntaskList, task] };
      setTasks(ntasks);
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
