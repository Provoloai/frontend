import { apiGet, apiPatch, apiPost } from "@/utils/api.util";
import {
  KnowledgeBaseResponse,
  KnowledgeBasePatchPayload,
  ImportKnowledgeBasePayload,
  ImportKnowledgeBaseResponse,
  KnowledgeBaseManualUpdatePayload,
} from "@/types/knowledgeBase";

const BASE_URL = "/knowledge-base";

/**
 * Retrieves the user's knowledge base.
 */
export const getKnowledgeBase = (): Promise<KnowledgeBaseResponse> => {
  return apiGet(BASE_URL);
};

/**
 * Partially updates the user's knowledge base.
 * @param payload The fields to update. Arrays passed will replace the existing lists.
 */
export const updateKnowledgeBase = (
  payload: KnowledgeBasePatchPayload
): Promise<KnowledgeBaseResponse> => {
  return apiPatch(BASE_URL, payload);
};

/**
 * Merges data into the user's knowledge base from external sources (resume/optimizer).
 * @param payload Import options
 */
export const importKnowledgeBase = (
  payload: ImportKnowledgeBasePayload
): Promise<ImportKnowledgeBaseResponse> => {
  return apiPost(`${BASE_URL}/import`, payload);
};

/**
 * Explicit manual update endpoint for knowledge base fields.
 * Similar to patch but strictly explicit.
 * @param payload The fields to update manually.
 */
export const manualUpdateKnowledgeBase = (
  payload: KnowledgeBaseManualUpdatePayload
): Promise<ImportKnowledgeBaseResponse> => {
  return apiPost(`${BASE_URL}/manual-update`, payload);
};
