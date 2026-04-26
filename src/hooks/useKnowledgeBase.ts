import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getKnowledgeBase,
  updateKnowledgeBase,
  importKnowledgeBase,
  manualUpdateKnowledgeBase,
} from "@/api/knowledgeBase";
import {
  KnowledgeBasePatchPayload,
  ImportKnowledgeBasePayload,
  KnowledgeBaseManualUpdatePayload,
} from "@/types/knowledgeBase";

const QUERY_KEY = ["knowledgeBase"];

export const useKnowledgeBase = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getKnowledgeBase,
  });
};

export const useUpdateKnowledgeBase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: KnowledgeBasePatchPayload) =>
      updateKnowledgeBase(payload),
    onSuccess: () => {
      // Invalidate the knowledge base query so it gets refetched
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      // Or you could optimistically update the cache with `data`
    },
  });
};

export const useImportKnowledgeBase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ImportKnowledgeBasePayload) =>
      importKnowledgeBase(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useManualUpdateKnowledgeBase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: KnowledgeBaseManualUpdatePayload) =>
      manualUpdateKnowledgeBase(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
