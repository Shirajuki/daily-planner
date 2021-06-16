import React, { useState } from "react";
import Column from "./components/Column";
import Footer from "./components/Footer";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import initialData from "./initialData";

const App: React.FC = () => {
  const [state, setState] = useState(initialData);

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
    <div className="App">
      <div className="todaysTask">
        <div className="topBackground">
          <h3>DAILYJUKIPLANNER</h3>
          <div className="infoBox"></div>
          <div className="navigationBox"></div>
        </div>
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            {state.columnOrder.map((columnId: number) => {
              const column: any = state.columns[columnId];
              const tasks: any = column.taskIds.map(
                (taskId: number) => state.tasks[taskId]
              );
              return <Column key={columnId} column={column} tasks={tasks} />;
            })}
          </DragDropContext>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
