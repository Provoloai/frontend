import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { optimizerApi } from "@/api";
import { queryKeys } from "@/lib/queryClient";
import type {
  OptimizerTargetSection,
  OptimizerVersion,
  OptimizerHistoryDetailRecord,
} from "@/types/optimizer";
import type { PortfolioFormData } from "@/schemas/portfolioSchema";
import {
  buildVersionFromGenerate,
  buildVersionFromRefine,
  normalizeHistoryRecord,
} from "@/utils/optimizer.util";

const initialWorkspace = {
  rootRecordId: null as string | null,
  versions: [] as OptimizerVersion[],
  currentVersionIndex: 0,
  unlimitedRefine: false,
  refinementsRemaining: -1,
};

export function useOptimizerWorkspace() {
  const queryClient = useQueryClient();
  const [workspace, setWorkspace] = useState(initialWorkspace);

  const currentVersion = useMemo(
    () => workspace.versions[workspace.currentVersionIndex] ?? null,
    [workspace.versions, workspace.currentVersionIndex]
  );

  const hasWorkspace =
    workspace.versions.length > 0 && !!workspace.rootRecordId;

  const hydrateFromHistory = useCallback(
    (record: OptimizerHistoryDetailRecord) => {
      const { rootRecordId, versions, formDefaults } =
        normalizeHistoryRecord(record);

      setWorkspace({
        rootRecordId,
        versions,
        currentVersionIndex: versions.length > 0 ? versions.length - 1 : 0,
        unlimitedRefine: true,
        refinementsRemaining: -1,
      });

      return formDefaults;
    },
    []
  );

  const applyGenerate = useCallback(
    async (payload: Record<string, unknown>) => {
      const recordId = payload.optimizerRecordId as string | undefined;

      setWorkspace((prev) => ({
        ...prev,
        rootRecordId: recordId ?? prev.rootRecordId,
        versions: recordId
          ? [buildVersionFromGenerate(payload, recordId)]
          : prev.versions,
        currentVersionIndex: 0,
        unlimitedRefine: !!payload.unlimitedRefine,
        refinementsRemaining:
          typeof payload.refinementsRemaining === "number"
            ? payload.refinementsRemaining
            : -1,
      }));

      await queryClient.invalidateQueries({
        queryKey: queryKeys.quota("upwork_profile_optimizer"),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.optimizerHistory.all(),
      });
    },
    [queryClient]
  );

  const refine = useCallback(
    async (instruction: string, targetSection: OptimizerTargetSection) => {
      const { rootRecordId } = workspace;
      if (!rootRecordId) {
        throw new Error("No optimization session to refine.");
      }

      const result = await optimizerApi.refineProfile({
        recordId: rootRecordId,
        instruction,
        targetSection,
      });

      const payload = result.data;
      const newVersion = buildVersionFromRefine(
        payload,
        instruction,
        targetSection
      );

      setWorkspace((prev) => ({
        ...prev,
        versions: [...prev.versions, newVersion],
        currentVersionIndex: prev.versions.length,
        unlimitedRefine: !!payload.unlimitedRefine,
        refinementsRemaining:
          typeof payload.refinementsRemaining === "number"
            ? payload.refinementsRemaining
            : prev.refinementsRemaining,
      }));

      await queryClient.invalidateQueries({
        queryKey: queryKeys.optimizerHistory.all(),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.optimizerHistory.detail(rootRecordId),
      });
    },
    [workspace.rootRecordId, queryClient]
  );

  const selectVersion = useCallback((index: number) => {
    setWorkspace((prev) => {
      if (index < 0 || index >= prev.versions.length) return prev;
      return { ...prev, currentVersionIndex: index };
    });
  }, []);

  const resetWorkspace = useCallback(() => {
    setWorkspace(initialWorkspace);
  }, []);

  const generate = useCallback(
    async (formData: PortfolioFormData) => {
      const result = await optimizerApi.optimizePortfolio({
        full_name: formData.freelancerName,
        professional_title: formData.profileTitle,
        profile: formData.profileDescription,
      });
      await applyGenerate(result.data);
      return result.data;
    },
    [applyGenerate]
  );

  return {
    ...workspace,
    currentVersion,
    hasWorkspace,
    hydrateFromHistory,
    applyGenerate,
    generate,
    refine,
    selectVersion,
    resetWorkspace,
  };
}
