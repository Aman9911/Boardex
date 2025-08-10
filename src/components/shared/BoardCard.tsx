import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBoardContext } from "@/context/BoardContext";
import { useUpdateBoard } from "@/hooks/useBoards";
import type { Board } from "@/types";
import { memo, useCallback } from "react";
import CreateBoardForm from "../forms/CreateBoardForm";
import Alert from "./Alert";
import { formatDate } from "@/lib/formatDate";

interface BoardCardProps {
  board: Board;
  handleDeleteBoard: (boardId: string) => void;
}

const BoardCard = ({ board, handleDeleteBoard }: BoardCardProps) => {
  const updateBoard = useUpdateBoard();
  const { setSelectedBoardId } = useBoardContext();

  const handleDelete = useCallback(() => {
    handleDeleteBoard(board.id);
  }, [handleDeleteBoard, board.id]);

  const handleUpdateBoardForm = useCallback(
    (data: Board) => {
      updateBoard.mutate(data);
    },
    [updateBoard]
  );

  return (
    <Card className="bg-white border-[#E5E7EB] hover:bg-[#EEF2FF] rounded-lg shadow-sm p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
      <CardHeader>
        <CardTitle
          className="text-xl cursor-pointer"
          onClick={() => setSelectedBoardId(board.id)}
        >
          {board.name}
        </CardTitle>
        <CardDescription className="text-base text-[#6B7280]">
          {board.description}
          <p className="text-sm">
            <span>Created:</span> {formatDate(new Date(board.createdAt))}
          </p>
        </CardDescription>
        <CardAction className="mt-4 flex flex-col gap-5">
          <Alert alertType="board" handleDelete={handleDelete} />
          <CreateBoardForm
            update={true}
            defaultValues={board}
            handleBoardForm={handleUpdateBoardForm}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default memo(BoardCard);
