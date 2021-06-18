import React, { useState } from "react";
import { ITask } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import "./index.css";

type TaskType = {
  task: ITask;
  index: number;
};
const Task: React.FC<TaskType> = ({ task, index }) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const handleInputChange = (event: any) => {
    const check: boolean = event.target.checked;
    setIsDone(check);
  };
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`taskContent ${snapshot.isDragging ? "dragging" : ""}`}
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
            <button>X</button>
            <div className="timeStatus"></div>
            <div className="tagColor"></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
