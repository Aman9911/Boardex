import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Priority, Task, TaskStatus } from "@/types";
import { Pencil, Plus } from "lucide-react";
import { memo, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import CustomCalendar from "../shared/CustomCalendar";
import Selector from "../shared/Selector";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const priorityOptions: Priority[] = ["Low", "Medium", "High"];
const statusOptions: TaskStatus[] = ["To Do", "In Progress", "Done"];

interface CreateTaskFormProp {
  update?: boolean;
  defaultValues?: Task;
  handleTaskForm: (data: Task, reset: () => void) => void;
}

const CreateTaskForm = ({
  handleTaskForm,
  defaultValues,
  update = false,
}: CreateTaskFormProp) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: defaultValues || {
      title: "",
      dueDate: undefined,
      priority: "Low",
      status: "To Do",
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<Task> = (data) => {
    handleTaskForm(data, reset);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {update ? (
          <Pencil className="h-5 w-5 hover:cursor-pointer text-[#4F46E5]" />
        ) : (
          <Button
            variant="default"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-sm hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200"
          >
            <Plus />
            New Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-zinc-500 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {update ? "Edit task" : "Create new task"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              {update
                ? "Check the details carefully"
                : "Add a new task to track progress, assign responsibilities, and manage deadlines."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="title">Task title</Label>
              <Input
                className="border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
                id="title"
                {...register("title", { required: "Task title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Controller
                name="dueDate"
                control={control}
                rules={{
                  required: "Due date is required",
                }}
                render={({ field }) => (
                  <CustomCalendar
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.dueDate && (
                <span className="text-red-500 text-sm">
                  {errors.dueDate.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Selector
                    value={field.value}
                    onChange={field.onChange}
                    options={priorityOptions}
                    placeholder="Select priority"
                  />
                )}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Selector
                    value={field.value}
                    onChange={field.onChange}
                    options={statusOptions}
                    placeholder="Select status"
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                onClick={() => reset()}
                variant="outline"
                className="px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-100 hover:cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="default"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
              type="submit"
            >
              {update ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateTaskForm);
