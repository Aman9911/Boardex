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
import type { Board } from "@/types";
import { Pencil, Plus } from "lucide-react";
import { memo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CreateBoardFormProp {
  update?: boolean;
  defaultValues?: {
    name: string;
    description?: string;
  };
  handleBoardForm: (data: Board, reset: () => void) => void;
}

const CreateBoardForm = ({
  handleBoardForm,
  defaultValues,
  update = false,
}: CreateBoardFormProp) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Board>({
    defaultValues: defaultValues || { name: "", description: "" },
  });

  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<Board> = (data) => {
    handleBoardForm(data, reset);
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
            New Board
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 text-gray-900 border border-zinc-500 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {update ? "Edit board" : "Create new board"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {update
                ? "Check the details carefully"
                : "Set up a new board to organize your projects, tasks, or workflows."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                className="border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
                id="name-1"
                {...register("name", { required: "Board name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description")}
                className="border border-gray-300 rounded-md text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  reset();
                }}
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

export default memo(CreateBoardForm);
