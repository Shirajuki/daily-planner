import { initialDaily } from "../initialData";
import { ITag, ITodoColumn } from "../types";

export const loadTasks = () => {
  const tasks: ITodoColumn[] = JSON.parse(
    localStorage.getItem("djukip-tasks") ?? "[]"
  );
  if (tasks.length === 0) return [];
  return tasks;
};

export const saveTasks = (tasks: ITodoColumn[]) => {
  localStorage.setItem("djukip-tasks", JSON.stringify(tasks));
};

export const loadDailies = () => {
  const dailies: ITodoColumn = JSON.parse(
    localStorage.getItem("djukip-dailies") ?? "{}"
  );
  if (dailies?.id === undefined) return initialDaily;
  return dailies;
};

export const saveDailies = (dailies: ITodoColumn) => {
  localStorage.setItem("djukip-dailies", JSON.stringify(dailies));
};

export const loadTags = () => {
  const tags: ITag[] = JSON.parse(localStorage.getItem("djukip-tags") ?? "[]");
  return tags;
};
export const saveTags = (tags: ITag[]) => {
  localStorage.setItem("djukip-tags", JSON.stringify(tags));
};

export const loadTheme = () => {
  const theme: string = localStorage.getItem("djukip-theme") ?? "light";
  return theme;
};
export const saveTheme = (theme: string) => {
  localStorage.setItem("djukip-theme", theme);
};
