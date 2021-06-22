import { ITodoColumn, ITag } from "./types";

export const initialTag: ITag[] = [
  { id: "tagid0", tagName: "test tag1", tagColor: "tomato" },
  { id: "tagid1", tagName: "test tag2", tagColor: "pink" },
  { id: "tagid2", tagName: "test tag3", tagColor: "lightblue" },
  { id: "tagid3", tagName: "test tag4", tagColor: "lightgreen" },
];

export const initialData: ITodoColumn = {
  tasks: [
    { id: "0", content: "Take out the garbage", tag: initialTag[0] },
    { id: "1", content: "Watch my favourite show", tag: initialTag[0] },
    { id: "2", content: "Charge my phone" },
    { id: "3", content: "Cook dinner", tag: initialTag[0] },
    { id: "4", content: "Example 1" },
    { id: "5", content: "Example 2" },
    { id: "6", content: "Example 3" },
  ],
  columns: [
    {
      id: "col0",
      title: "To do",
      taskIds: ["0", "1", "2", "3", "4", "5", "6"],
      checked: [],
    },
  ],
  columnOrder: ["col0"],
};
