import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import Column from "../Column";
import { DragDropContext } from "react-beautiful-dnd";
import { IColumn, ITask, ITodoColumn } from "../../types";

type DroppableListType = {
  rerender: boolean;
  showTitle: boolean;
  hasEmptyString: string;
  showDeleteBtn?: boolean;
  hasBigTag?: boolean;
  onClick?: (task: ITask, columnId: string) => void;
  data: ITodoColumn;
};
const DroppableList: React.FC<DroppableListType> = ({
  rerender,
  showTitle,
  hasEmptyString,
  showDeleteBtn,
  hasBigTag,
  onClick,
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
      }
    }
  }, [divRef, rerender]);

  useEffect(() => {
    setState(data);
  }, [data]);

  const updateChecked = (columnId: string, task: ITask, check: boolean) => {
    const newColumns = state.columns.filter(
      (col: IColumn) => col.id !== columnId
    );
    const newColumn: IColumn =
      state.columns.find((col: IColumn) => col.id === columnId) ??
      ({} as IColumn);
    const oldChecked = newColumn?.checked;
    if (oldChecked) {
      const newChecked = [...new Set([...oldChecked, task.id])];
      if (!check) newChecked.splice(newChecked.indexOf(task.id), 1);
      const nColumn: IColumn = { ...newColumn, checked: newChecked };
      const newState = { ...state, columns: [...newColumns, nColumn] };
      setState(newState);
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const columnId: string = source.droppableId;
    const column = state.columns.find((col: any) => col.id === columnId);
    if (column) {
      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...column, taskIds: newTaskIds };
      const newColumns = state.columns.filter(
        (col: IColumn) => col.id !== newColumn.id
      );
      const newState = { ...state, columns: [...newColumns, newColumn] };
      setState(newState);
    }
  };
  return (
    <div
      className={`taskContainer ${isOverflow ? "overflow" : ""}`}
      ref={divRef}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId: string) => {
          const column: IColumn =
            state.columns.find((col: IColumn) => col.id === columnId) ??
            ({} as IColumn);
          const tasks: ITask[] = column.taskIds
            .map(
              (taskId: string) =>
                state.tasks.find((task: ITask) => task.id === taskId) ??
                ({} as ITask)
            )
            .filter((task: ITask) => task.id);
          return (
            <Column
              key={columnId}
              column={column}
              tasks={tasks}
              showTitle={showTitle}
              showDeleteBtn={showDeleteBtn}
              hasEmptyString={hasEmptyString}
              updateChecked={updateChecked}
              hasBigTag={hasBigTag}
              onClick={onClick}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DroppableList;
