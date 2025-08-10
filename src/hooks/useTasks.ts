import api from "@/lib/api";
import type { Task } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await api.get("/tasks");
      return res.data;
    },
  });
}

export function useTasksById(boardId: string | null) {
  return useQuery<Task[]>({
    queryKey: ["tasks", boardId],
    queryFn: async () => {
      if (!boardId) throw new Error("No board ID provided");
      const res = await api.get(`/tasks/by-board/${boardId}`);
      return res.data;
    },
    enabled: !!boardId,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Task) => {
      const res = await api.post("/tasks", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Task) => {
      const res = await api.put(`tasks/${data.id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
