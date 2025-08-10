import api from "@/lib/api";
import type { Board } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBoards() {
  return useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await api.get("/boards");
      return res.data;
    },
  });
}

export function useBoardById(id: string | null) {
  return useQuery<Board[]>({
    queryKey: ["boards", id],
    queryFn: async () => {
      if (!id) throw new Error("No board ID provided");
      const res = await api.get(`/boards/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Board) => {
      const res = await api.post("/boards", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (boardId: string) => {
      await api.delete(`/boards/${boardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Board) => {
      const res = await api.put(`boards/${data.id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
