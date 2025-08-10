import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateBoard, useDeleteBoard } from "@/hooks/useBoards";
import type { Board } from "@/types";
import { memo, useCallback } from "react";
import CreateBoardForm from "../forms/CreateBoardForm";
import BoardCard from "./BoardCard";

interface BoardProps {
  boards: Board[];
}

const Board = ({ boards }: BoardProps) => {
  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();

  const handleBoardForm = useCallback(
    (data: Board, reset: () => void) => {
      const createdAt = new Date().toISOString().split("T")[0];
      createBoard.mutate({ ...data, createdAt });
      reset();
    },
    [createBoard]
  );

  const handleDeleteBoard =  useCallback((boardId: string) => {
      deleteBoard.mutate(boardId);
      // setTimeout(()=>{
      //   window.location.reload();
      // },500)
  },[deleteBoard])

  return (
    <Card className="border-0 shadow-md bg-white border-[#E5E7EB]">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="font-serif text-xl font-semibold text-gray-800">
            Boards
          </CardTitle>
          <CreateBoardForm handleBoardForm={handleBoardForm} />
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100vh-18rem)] overflow-auto">
        <div className="flex flex-col gap-2">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              handleDeleteBoard={handleDeleteBoard}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(Board);
