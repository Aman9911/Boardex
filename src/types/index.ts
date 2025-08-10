export type TaskStatus = "To Do" | "In Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export interface Board {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  boardId: string;
  title: string;
  dueDate: Date;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
}
