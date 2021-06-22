import { atom } from "recoil";
import { initialTag } from "../initialData";

export const tagsState = atom({
  key: "tags",
  default: initialTag,
});

export const popupState = atom({
  key: "popupState",
  default: false,
});

export const topicState = atom({
  key: "topicState",
  default: "it",
});
