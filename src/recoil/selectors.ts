import { selector } from "recoil";
import * as utilities from "../utilities";
import { IColumn, ITag, ITask, ITodoColumn } from "../types";
import {
  dailiesState,
  dateState,
  homeTasksState,
  tagsState,
  tasksState,
} from "./atoms";
import { initialData } from "../initialData";
import { prettyDate } from "../utilities";

export const tagTasksState = selector({
  key: "tagTasks",
  get: ({ get }) => {
    const tags: ITag[] = get(tagsState);
    const tasks: ITask[] = [
      ...tags.map((tag: ITag) => {
        return { id: tag.id, title: tag.tagName, description: "", tag: tag };
      }),
    ];
    const tagTasks: ITodoColumn = {
      tasks: tasks,
      columns: [
        {
          id: "0",
          title: "Tags",
          taskIds: [...tags.map((tag: ITag) => tag.id)],
        },
      ],
      columnOrder: ["0"],
    };
    const objectColumns: any = {};
    tagTasks.columns.forEach(
      (col: IColumn) => (objectColumns[col.id] = col.taskIds)
    );
    return {
      todoColumn: tagTasks,
      taskIds: objectColumns,
    };
  },
});

export const dailiesSelectorState = selector({
  key: "dailiesSelectorState",
  get: ({ get }) => {
    const tasks: ITodoColumn = get(dailiesState);
    const tags: ITag[] = get(tagsState);
    const ntasksList: ITask[] = tasks?.tasks
      ? [
          ...tasks?.tasks?.map((task: ITask) => {
            const tag = tags.find((t: ITag) => task?.tags?.includes(t.id));
            if (tag) return { ...task, tag: tag };
            else return task;
          }),
        ]
      : [];
    const ntasks = { ...tasks, tasks: ntasksList };
    const tasksChecked = tasks?.columns ? tasks?.columns[0].checked : [];
    return {
      todoColumn: ntasks,
      tasksChecked: tasksChecked,
      tasks: ntasks.tasks,
    };
  },
});

const loadNewDailyTask = (date: Date, dailies: ITodoColumn) => {
  if (date.getTime() >= new Date(prettyDate(new Date())).getTime()) {
    const weekday = utilities.getWeekday(date).toLowerCase();
    const tasks = dailies.tasks;
    const taskIds =
      dailies.columns.find((col: IColumn) => col.id === weekday)?.taskIds ?? [];
    const filteredTasks = tasks.filter((t: ITask) => taskIds.includes(t.id));
    const taskCol: ITodoColumn = {
      id: utilities.prettyDate(date),
      tasks: filteredTasks,
      columns: [
        {
          id: "todo",
          title: "To do",
          taskIds: taskIds,
          checked: [],
        },
      ],
      columnOrder: ["todo"],
    };
    return taskCol;
  }
  return initialData;
};
export const tasksSelectorState = selector({
  key: "tasksSelectorState",
  get: ({ get }) => {
    const date: Date = get(dateState);
    const dateKey = utilities.prettyDate(date);
    const dailies: ITodoColumn = get(dailiesState);
    const taskCol: ITodoColumn[] = get(tasksState);
    const curTasks: ITodoColumn = get(homeTasksState);
    const filteredTasks: ITodoColumn[] = taskCol.filter(
      (t: ITodoColumn) => t?.id === dateKey
    );
    const tasks: ITodoColumn =
      filteredTasks.length > 0
        ? filteredTasks[0]
        : curTasks?.id === dateKey
        ? curTasks
        : { ...loadNewDailyTask(date, dailies), id: dateKey };
    const tags: ITag[] = get(tagsState);
    const ntasksList: ITask[] = [
      ...tasks.tasks.map((task: ITask) => {
        const tag = tags.find((t: ITag) => task?.tags?.includes(t.id));
        if (tag) return { ...task, tag: tag };
        else return task;
      }),
    ];
    const ntasks = { ...tasks, tasks: ntasksList };
    const tasksChecked = tasks.columns[0].checked;
    return {
      todoColumn: ntasks,
      tasksChecked: tasksChecked,
      tasks: ntasks.tasks,
    };
  },
});
