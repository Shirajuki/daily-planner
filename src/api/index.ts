import { initialDaily, initialData } from "../initialData";
import { ITag, ITodoColumn } from "../types";

export const loadTasks = () => {
  const tasks: ITodoColumn[] = JSON.parse(
    localStorage.getItem("djukip-tasks") ?? "[]"
  );
  console.log("gott", tasks);
  if (tasks.length === 0) return [initialData];
  return tasks;
};

export const saveTasks = (tasks: ITodoColumn[]) => {
  localStorage.setItem("djukip-tasks", JSON.stringify(tasks));
  console.log("savedt", tasks);
};

export const loadDailies = () => {
  const dailies: ITodoColumn = JSON.parse(
    localStorage.getItem("djukip-dailies") ?? "{}"
  );
  console.log("gotd", dailies);
  if (dailies?.id === undefined) return initialDaily;
  return dailies;
};

export const saveDailies = (dailies: ITodoColumn) => {
  localStorage.setItem("djukip-dailies", JSON.stringify(dailies));
  console.log("savedd", dailies);
};

export const loadTags = () => {
  const tags: ITag[] = JSON.parse(localStorage.getItem("djukip-tags") ?? "[]");
  console.log("gottt", tags);
  return tags;
};
export const saveTags = (tags: ITag[]) => {
  localStorage.setItem("djukip-tags", JSON.stringify(tags));
  console.log("savedtt", tags);
};
