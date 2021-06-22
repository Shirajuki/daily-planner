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
  content: string;
  tag?: ITag;
}
export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
  checked?: string[];
}
export interface ITodoColumn {
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
};
