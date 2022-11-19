interface ITaskFiles {
  filename: string;
  fileSize: number;
}

export interface ITaskFull {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files?: ITaskFiles[];
}

export interface ILoadedColumnTasks {
  id: string;
  title: string;
  order: number;
  tasks: ITaskFull[];
}

export interface IDeleteTask {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface IUpdateTask {
  id: string;
  title: string;
  description: string;
  boardId: string;
  columnId: string;
}
