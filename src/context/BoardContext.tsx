import { createContext, useContext, useState, type ReactNode } from "react";

type BoardContextType = {
  selectedBoardId: string | null;
  setSelectedBoardId: (id: string | null) => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

type BoardProviderProps = {
  children: ReactNode;
};

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [selectedBoardId, setSelectedBoardIdState] = useState<string | null>(
    () => {
      return localStorage.getItem("selectedBoardId") || null;
    }
  );
  const setSelectedBoardId = (id: string | null) => {
    if (id) {
      localStorage.setItem("selectedBoardId", id);
    } else {
      localStorage.removeItem("selectedBoardId");
    }
    setSelectedBoardIdState(id);
  };
  return (
    <BoardContext.Provider value={{ selectedBoardId, setSelectedBoardId }}>
      {children}
    </BoardContext.Provider>
  );
};
