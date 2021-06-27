import { atom } from "recoil";
import { initialDaily, initialData, initialTag } from "../initialData";

export const tagsState = atom({
  key: "tagsState",
  default: initialTag,
});

export const tasksState = atom({
  key: "tasksState",
  default: initialData,
});

export const dailiesState = atom({
  key: "dailiesState",
  default: initialDaily,
});

export const themeState = atom({
  key: "themeState",
  default: "dark",
});
