import { initialDaily, initialTheme } from "../initialData";
import { ITag, ITheme, ITodoColumn } from "../types";

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
  const theme: ITheme = JSON.parse(
    localStorage.getItem("djukip-theme") ?? "{}"
  );
  if (theme.scheme === undefined || theme.themeColor === undefined)
    return initialTheme;
  return theme;
};
export const saveTheme = (theme: ITheme) => {
  localStorage.setItem("djukip-theme", JSON.stringify(theme));
};
