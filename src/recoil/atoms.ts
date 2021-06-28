import { atom } from "recoil";
import { loadDailies, loadTags, loadTasks } from "../api";
import { initialData } from "../initialData";

export const tagsState = atom({
  key: "tagsState",
  default: loadTags(),
});

export const tasksState = atom({
  key: "tasksState",
  default: loadTasks() ?? [initialData],
});

export const homeTasksState = atom({
  key: "homeTasksState",
  default: initialData,
});

export const dailiesState = atom({
  key: "dailiesState",
  default: loadDailies(),
});

export const dateState = atom({
  key: "dateState",
  default: new Date(),
});

export const themeState = atom({
  key: "themeState",
  default: "dark",
});
