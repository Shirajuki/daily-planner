import { ITodoColumn, ITag, ITagSettings, ITask, ITheme } from "./types";

export const initialTheme: ITheme = {
  scheme: "light",
  themeColor: "default",
};
export const initialTag: ITag[] = [
  { id: "tagid0", tagName: "test tag1", tagColor: "tomato" },
  { id: "tagid1", tagName: "test tag2", tagColor: "pink" },
  { id: "tagid2", tagName: "test tag3", tagColor: "lightblue" },
  { id: "tagid3", tagName: "test tag4", tagColor: "lightgreen" },
];

export const initialData: ITodoColumn = {
  tasks: [],
  columns: [
    {
      id: "todo",
      title: "To do",
      taskIds: [],
      checked: [],
    },
  ],
  columnOrder: ["todo"],
};

export const initialDays: ITag[] = [
  { id: "monday", tagName: "Monday", tagColor: "var(--primary0)" },
  { id: "tuesday", tagName: "Tuesday", tagColor: "var(--primary0)" },
  { id: "wednesday", tagName: "Wednesday", tagColor: "var(--primary0)" },
  { id: "thursday", tagName: "Thursday", tagColor: "var(--primary0)" },
  { id: "friday", tagName: "Friday", tagColor: "var(--primary0)" },
  { id: "saturday", tagName: "Saturday", tagColor: "var(--primary0)" },
  { id: "sunday", tagName: "Sunday", tagColor: "var(--primary0)" },
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
export const initialDaily: ITodoColumn = {
  id: "daily",
  tasks: [],
  columns: [
    {
      id: "monday",
      title: "Monday",
      taskIds: [],
    },
    {
      id: "tuesday",
      title: "Tuesday",
      taskIds: [],
    },
    {
      id: "wednesday",
      title: "Wednesday",
      taskIds: [],
    },
    {
      id: "thursday",
      title: "Thursday",
      taskIds: [],
    },
    {
      id: "friday",
      title: "Friday",
      taskIds: [],
    },
    {
      id: "saturday",
      title: "Saturday",
      taskIds: [],
    },
    {
      id: "sunday",
      title: "Sunday",
      taskIds: [],
    },
  ],
  columnOrder: [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ],
};
