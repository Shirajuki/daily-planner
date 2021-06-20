import { ITodoColumn, ITag } from "./types";

const initialTag: ITag = { id: 1, tagName: "test tag", tagColor: "tomato" };

const initialData: ITodoColumn = {
  tasks: [
    { id: 0, content: "Take out the garbage", tag: initialTag },
    { id: 1, content: "Watch my favourite show", tag: initialTag },
    { id: 2, content: "Charge my phone" },
    { id: 3, content: "Cook dinner", tag: initialTag },
    { id: 4, content: "Example 1" },
    { id: 5, content: "Example 2" },
    { id: 6, content: "Example 3" },
  ],
  columns: [
    {
      id: 0,
      title: "To do",
      taskIds: [0, 1, 2, 3, 4, 5, 6],
      checked: [],
    },
  ],
  columnOrder: [0],
};
export default initialData;
