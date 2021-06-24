import { selector } from "recoil";
import { IColumn, ITag, ITask, ITodoColumn } from "../types";
import { tagsState, tasksState } from "./atoms";

export const tagTasksState = selector({
  key: "tagTasks",
  get: ({ get }) => {
    const tags: ITag[] = get(tagsState);
    const tasks: ITask[] = [
      ...tags.map((tag: ITag) => {
        return { id: tag.id, content: tag.tagName, tag: tag };
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

export const tasksSelectorState = selector({
  key: "tasksSelectorState",
  get: ({ get }) => {
    const tasks: ITodoColumn = get(tasksState);
    const tasksChecked = tasks.columns[0].checked;
    return {
      todoColumn: tasks,
      tasksChecked: tasksChecked,
      tasks: tasks.tasks,
    };
  },
});
