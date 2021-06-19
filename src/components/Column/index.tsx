import React from "react";
import "./index.css";
import { IColumn, ITask } from "../../types";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

type ColumnType = {
  column: IColumn;
  tasks: ITask[];
  showTitle: boolean;
  hasEmptyString: string;
  updateChecked: (columnId: number, index: number, check: boolean) => void;
};
const Column: React.FC<ColumnType> = ({
  column,
  tasks,
  showTitle,
  hasEmptyString,
  updateChecked,
}) => {
  return (
    <Droppable droppableId={String(column.id)}>
      {(provided, snapshot) => (
        <div
          className={`taskColumn ${snapshot.isDraggingOver ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {showTitle ? <h3>{column.title}</h3> : <></>}
          {tasks.length === 0 && hasEmptyString !== "" ? (
            <p>{hasEmptyString}</p>
          ) : (
            tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
                checked={column?.checked || null}
                updateChecked={updateChecked}
              />
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
