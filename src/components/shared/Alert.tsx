import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { memo } from "react";

interface AlertProps {
  alertType: "board" | "task";
  handleDelete: () => void;
}

const Alert = ({ handleDelete, alertType }: AlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="h-5 w-5 hover:cursor-pointer text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] bg-white border border-zinc-500 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600">
            This action cannot be undone. This will permanently delete this
            {alertType === "board"
              ? " board and remove your data from our servers."
              : " task and remove it from the board."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300 hover:cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(Alert);
