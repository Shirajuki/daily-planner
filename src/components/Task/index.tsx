import React, { useState } from "react";
import { ITask } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import "./index.css";

type TaskType = {
  task: ITask;
  index: number;
  columnId: number;
  checked: number[] | null;
  updateChecked: (columnId: number, index: number, check: boolean) => void;
  showDeleteBtn?: boolean;
  hasBigTag?: boolean;
  onClick?: (task: ITask, columnId: number) => void;
};
const Task: React.FC<TaskType> = ({
  task,
  index,
  columnId,
  checked,
  updateChecked,
  showDeleteBtn,
  hasBigTag,
  onClick,
}) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const handleInputChange = (event: any) => {
    const check: boolean = event.target.checked;
    if (checked !== null) {
      updateChecked(columnId, index, check);
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
          onClick={() => {
            if (onClick) onClick(task, columnId);
          }}
        >
          <input
            type="checkbox"
            checked={isDone}
            onChange={handleInputChange}
          />
          <p>{task.content}</p>
          <div className={hasBigTag ? "bigTag" : ""}>
            <button>✕</button>
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
