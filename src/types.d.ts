export interface ITag {
  id: string;
  tagName: string;
  tagColor: string;
}
export interface ITagSettings {
  tags: ITag[];
  selected: string[];
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  time?: Date;
  dailyTask?: string[];
  tag?: ITag;
  tags?: string[];
}
export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
  checked?: string[];
}
export interface ITodoColumn {
  id?: string;
  tasks: ITask[];
  columns: IColumn[];
  columnOrder: string[];
}
export type ScreensType = {
  hidden: boolean;
};
export type ScreensEditType = {
  task: ITask;
  taskIds?: string[];
  deleteEventHandler?: (tag: ITask) => void;
};
