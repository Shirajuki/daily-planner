export interface ITag {
  id: number;
  tagName: string;
  tagColor: string;
}
export interface ITask {
  id: number;
  content: string;
  tag?: ITag;
}
export interface IColumn {
  id: number;
  title: string;
  taskIds: number[];
  checked?: number[];
}
export interface ITodoColumn {
  tasks: ITask[];
  columns: IColumn[];
  columnOrder: number[];
}
export type ScreensType = {
  hidden: boolean;
};
