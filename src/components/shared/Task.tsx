import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBoardById } from "@/hooks/useBoards";
import { useCreateTask, useDeleteTask } from "@/hooks/useTasks";
import type { Task } from "@/types";
import { memo, useCallback } from "react";
import CreateTaskForm from "../forms/CreateTaskForm";
import TaskCard from "./TaskCard";

interface TaskProps {
  tasks: Task[];
  tasksData: string;
}

const Task = ({ tasks, tasksData: boardId }: TaskProps) => {
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const { data: task } = useBoardById(boardId);

  const handleTaskForm = useCallback(
    (data:Task,reset:()=>void) => {
      const createdAt = new Date().toISOString().split("T")[0];
      createTask.mutate({ ...data, createdAt, boardId });
      reset()
    },
    [createTask]
  );
 
  const handleDeleteTask = useCallback(
    (taskId: string) => {
      deleteTask.mutate(taskId);
    },
    [deleteTask]
  );
  return (
    <Card className="border-0 shadow-md bg-white border-[#E5E7EB] ">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="font-serif text-xl font-semibold text-gray-800">
            
            {
              //@ts-ignore
            task?.name
            } Tasks
          </CardTitle>
          <CreateTaskForm handleTaskForm={handleTaskForm} />
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex flex-col gap-2">
          {tasks.length === 0 && (
            <p className="text-xl font-semibold text-center">No task</p>
          )}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(Task);
