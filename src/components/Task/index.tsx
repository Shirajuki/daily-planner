import React, { useState } from "react";
import { ITask } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import "./index.css";

type TaskType = {
  task: ITask;
  index: number;
  columnId: string;
  checked: string[] | null;
  updateChecked: (columnId: string, task: ITask, check: boolean) => void;
  showDeleteBtn?: boolean;
  deleteEventHandler?: (tag: ITask) => void;
  hasBigTag?: boolean;
  onClick?: (task: ITask, columnId: string) => void;
};
const Task: React.FC<TaskType> = ({
  task,
  index,
  columnId,
  checked,
  updateChecked,
  showDeleteBtn,
  deleteEventHandler,
  hasBigTag,
  onClick,
}) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const handleInputChange = (event: any) => {
    const check: boolean = event.target.checked;
    if (checked !== null) {
      updateChecked(columnId, task, check);
    }
    setIsDone(check);
  };
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`taskContent ${snapshot.isDragging ? "dragging" : ""} ${
            checked == null ? "noCheck" : ""
          } ${showDeleteBtn ? "showDeleteBtn" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <input
            type="checkbox"
            checked={isDone}
            onChange={handleInputChange}
          />
          <p
            onClick={() => {
              if (onClick) onClick(task, columnId);
            }}
          >
            {task.title}
          </p>
          <div className={hasBigTag ? "bigTag" : ""}>
            <button
              onClick={() => {
                if (deleteEventHandler) deleteEventHandler(task);
              }}
            >
              ✕
            </button>
            <div className="timeStatus"></div>
            <div
              className="tagColor"
              hidden={task?.tag === undefined}
              style={{ backgroundColor: task?.tag?.tagColor ?? "initial" }}
            ></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
