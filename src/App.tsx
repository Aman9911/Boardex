import { useEffect } from "react";
import Board from "./components/shared/Board";
import CustomSkeleton from "./components/shared/CustomSkeleton";
import Task from "./components/shared/Task";
import { useBoardContext } from "./context/BoardContext";
import { useBoards } from "./hooks/useBoards";
import { useTasksById } from "./hooks/useTasks";
import ErrorPage from "./components/shared/ErrorPage";

function App() {
  const {
    data: boards,
    isLoading: isBoardLoading,
    error: boardError,
  } = useBoards();

  const { selectedBoardId, setSelectedBoardId } = useBoardContext();

  const {
    data: tasks,
    isLoading: isTaskLoading,
    error: taskError,
  } = useTasksById(selectedBoardId);

  useEffect(() => {
    if (!selectedBoardId && boards?.length) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId, setSelectedBoardId]);

  if (isBoardLoading || isTaskLoading || !selectedBoardId) {
    return (
        <CustomSkeleton />
    );
  }

  if (boardError || taskError) return <ErrorPage/>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-center pt-5 font-serif text-3xl font-bold tracking-tight text-gray-900">
        Board Tasks
      </h1>
      <div className="flex flex-col md:flex-row gap-5 m-2 md:m-10 ">
        <div className="w-full">
          <Board boards={boards ?? []} />
        </div>
        <div className="w-full">
          <Task tasks={tasks ?? []} tasksData={selectedBoardId} />
        </div>
      </div>
    </div>
  );
}

export default App;
