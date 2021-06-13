import { ITodoColumn } from "./types";

const initialData: ITodoColumn = {
  tasks: [
    { id: 0, content: "Take out the garbage" },
    { id: 1, content: "Watch my favourite show" },
    { id: 2, content: "Charge my phone" },
    { id: 3, content: "Cook dinner" },
  ],
  columns: [
    {
      id: 0,
      title: "To do",
      taskIds: [0, 1, 2, 3],
    },
  ],
  columnOrder: [0],
};
export default initialData;
