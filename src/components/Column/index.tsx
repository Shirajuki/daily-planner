import React from "react";
import "./index.css";
import { IColumn, ITask } from "../../types";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

type ColumnType = {
  column: IColumn;
  tasks: ITask[];
};
const Column: React.FC<ColumnType> = ({ column, tasks }) => {
  return (
    <Droppable droppableId={String(column.id)}>
      {(provided, snapshot) => (
        <div
          className={`taskColumn ${snapshot.isDraggingOver ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
