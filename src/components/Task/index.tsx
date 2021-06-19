import React, { useEffect, useState } from "react";
import { ITask } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import "./index.css";

type TaskType = {
  task: ITask;
  index: number;
  columnId: number;
  checked: number[] | null;
  updateChecked: (columnId: number, index: number, check: boolean) => void;
};
const Task: React.FC<TaskType> = ({
  task,
  index,
  columnId,
  checked,
  updateChecked,
}) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const handleInputChange = (event: any) => {
    const check: boolean = event.target.checked;
    if (checked !== null) {
      updateChecked(columnId, index, check);
    }
    setIsDone(check);
  };
  useEffect(() => {
    if (checked !== null) {
      console.log(checked);
    }
  }, [checked]);
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`taskContent ${snapshot.isDragging ? "dragging" : ""} ${
            checked == null ? "noCheck" : ""
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <input
            type="checkbox"
            checked={isDone}
            onChange={handleInputChange}
          />
          <p>{task.content}</p>
          <div>
            <button>✕</button>
            <div className="timeStatus"></div>
            <div className="tagColor"></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
