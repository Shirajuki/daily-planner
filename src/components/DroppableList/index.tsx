import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import Column from "../Column";
import { DragDropContext } from "react-beautiful-dnd";
import { ITodoColumn } from "../../types";

type DroppableListType = {
  rerender: boolean;
  showTitle: boolean;
  hasEmptyString: string;
  data: ITodoColumn;
};
const DroppableList: React.FC<DroppableListType> = ({
  rerender,
  showTitle,
  hasEmptyString,
  data,
}) => {
  const [state, setState] = useState(data);
  const [isOverflow, setIsOverflow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current != null) {
      const wrapper: HTMLDivElement = divRef.current;
      const height = [...wrapper.children]
        .map((taskColumn) => {
          const col = taskColumn as HTMLDivElement;
          return col.offsetHeight;
        })
        .reduce((a: number, b: number) => a + b, 0);
      if (height > wrapper.offsetHeight) {
        setIsOverflow(true);
        console.log(true);
      }
    }
  }, [divRef, rerender]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const columnId: number = +source.droppableId;
    const column = state.columns.find((col: any) => col.id === columnId);
    if (column) {
      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, +draggableId);
      const newColumn = { ...column, taskIds: newTaskIds };
      const newColumns = [...state.columns];
      newColumns[columnId] = newColumn;
      const newState = { ...state, columns: newColumns };
      setState(newState);
    }
  };
  return (
    <div
      className={`taskContainer ${isOverflow ? "overflow" : ""}`}
      ref={divRef}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId: number) => {
          const column: any = state.columns[columnId];
          const tasks: any = column.taskIds.map(
            (taskId: number) => state.tasks[taskId]
          );
          return (
            <Column
              key={columnId}
              column={column}
              tasks={tasks}
              showTitle={showTitle}
              hasEmptyString={hasEmptyString}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DroppableList;
