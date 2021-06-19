import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { IColumn, ITask } from "../../types";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

type ColumnType = {
  column: IColumn;
  tasks: ITask[];
};
const Column: React.FC<ColumnType> = ({ column, tasks }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current != null) {
      const wrapper: HTMLDivElement = divRef.current;
      const taskColumn: HTMLDivElement = wrapper.children[0] as HTMLDivElement;
      if (taskColumn.offsetHeight > wrapper.offsetHeight) setIsOverflow(true);
    }
  }, [divRef]);

  return (
    <div
      className={`taskContainer ${isOverflow ? "overflow" : ""}`}
      ref={divRef}
    >
      <Droppable droppableId={String(column.id)}>
        {(provided, snapshot) => (
          <div
            className={`taskColumn ${
              snapshot.isDraggingOver ? "dragging" : ""
            }`}
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
    </div>
  );
};

export default Column;
