import { atom } from "recoil";
import { initialTag } from "../initialData";

export const tagsState = atom({
  key: "tagsState",
  default: initialTag,
});

export const themeState = atom({
  key: "themeState",
  default: "dark",
});
