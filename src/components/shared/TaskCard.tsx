import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateTask } from "@/hooks/useTasks";
import { formatDate, getDays } from "@/lib/formatDate";
import type { Task } from "@/types";
import { memo, useCallback } from "react";
import CreateTaskForm from "../forms/CreateTaskForm";
import { Badge } from "../ui/badge";
import Alert from "./Alert";

interface TaskCardProps {
  task: Task;
  handleDeleteTask: (boardId: string) => void;
}

const tagColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-blue-100 text-blue-800",
  Low: "bg-green-100 text-green-800",
};

const statusColors = {
  "To Do": "bg-gray-100 text-gray-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Done: "bg-emerald-100 text-emerald-800",
};

const TaskCard = ({ task, handleDeleteTask }: TaskCardProps) => {
  const updateTask = useUpdateTask();

  const modifiedDueDate = new Date(task.dueDate);
  const modifiedCreatedAt = new Date(task.createdAt);
  const days = getDays(modifiedCreatedAt, modifiedDueDate);
  const handleDelete = useCallback(() => {
    handleDeleteTask(task.id);
  }, [handleDeleteTask, task.id]);

  const handleUpdateTaskForm = useCallback(
    (data: Task) => {
      updateTask.mutate(data);
    },
    [updateTask]
  );
  return (
    <Card className="bg-white border-[#E5E7EB] hover:bg-[#EEF2FF] rounded-lg shadow-sm p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-[#1F2937]">{task.title}</CardTitle>
        <CardDescription className="text-base text-[#6B7280]">
          <p className="text-sm">
            <span>Assign:</span> {formatDate(new Date(task.createdAt))}
          </p>
          <p className="text-sm ">
            <span>Due:</span>
            {formatDate(modifiedDueDate)} [ {days} day's left ]
          </p>
        </CardDescription>
        <CardAction className="my-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <Badge
              variant="outline"
              className={`text-base w-24 hover:cursor-pointer ${
                tagColors[task.priority]
              }`}
            >
              {task.priority}
            </Badge>
            <Badge
              variant="outline"
              className={`text-base w-24 hover:cursor-pointer ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </Badge>
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <Alert alertType="task" handleDelete={handleDelete} />
            <CreateTaskForm
              update={true}
              defaultValues={task}
              handleTaskForm={handleUpdateTaskForm}
            />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default memo(TaskCard);
