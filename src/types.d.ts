export interface ITask {
  id: number;
  content: string;
}
export interface IColumn {
  id: number;
  title: string;
  taskIds: number[];
}
export interface ITodoColumn {
  tasks: ITask[];
  columns: IColumn[];
  columnOrder: number[];
}
export type ScreensType = {
  hidden: boolean;
};
