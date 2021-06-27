import { ITodoColumn, ITag, ITagSettings, ITask } from "./types";

export const initialTag: ITag[] = [
  { id: "tagid0", tagName: "test tag1", tagColor: "tomato" },
  { id: "tagid1", tagName: "test tag2", tagColor: "pink" },
  { id: "tagid2", tagName: "test tag3", tagColor: "lightblue" },
  { id: "tagid3", tagName: "test tag4", tagColor: "lightgreen" },
];

export const initialData: ITodoColumn = {
  tasks: [
    {
      id: "0",
      title: "Take out the garbage",
      description: "",
      tag: initialTag[0],
    },
    {
      id: "1",
      title: "Watch my favourite show",
      description: "",
      tag: initialTag[0],
    },
    { id: "2", title: "Charge my phone", description: "" },
    { id: "3", title: "Cook dinner", description: "", tag: initialTag[0] },
    { id: "4", title: "Example 1", description: "" },
    { id: "5", title: "Example 2", description: "" },
    { id: "6", title: "Example 3", description: "" },
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

export const initialDays: ITag[] = [
  { id: "day1", tagName: "Monday", tagColor: "#e39df9" },
  { id: "day2", tagName: "Tuesday", tagColor: "#e39df9" },
  { id: "day3", tagName: "Wednesday", tagColor: "#e39df9" },
  { id: "day4", tagName: "Thursday", tagColor: "#e39df9" },
  { id: "day5", tagName: "Friday", tagColor: "#e39df9" },
  { id: "day6", tagName: "Saturday", tagColor: "#e39df9" },
  { id: "day7", tagName: "Sunday", tagColor: "#e39df9" },
];
export const initialDaySettings: ITagSettings = {
  tags: initialDays,
  selected: [],
};
export const initialTask: ITask = {
  id: "",
  title: "",
  description: "",
  dailyTask: [],
};
