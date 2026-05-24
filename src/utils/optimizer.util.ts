import {
  OPTIMIZER_RESULT_SECTIONS,
  OPTIMIZER_TARGET_SECTION_OPTIONS,
} from "@/constants/optimizer";
import type {
  AccordionSection,
  OptimizerResults,
  OptimizerTargetSection,
  OptimizerVersion,
} from "@/types/optimizer";

export function mapApiToOptimizerResults(
  data: Record<string, unknown>
): OptimizerResults {
  return {
    fullAnalysis:
      (data.fullAnalysis as string) || "Analysis completed successfully",
    weaknessesAndOptimization:
      (data.weaknessesAndOptimization as string) || "",
    optimizedProfileOverview: (data.optimizedProfileOverview as string) || "",
    suggestedProjectTitles: (data.suggestedProjectTitles as string) || "",
    recommendedVisuals: (data.recommendedVisuals as string) || "",
    beforeAfterComparison: (data.beforeAfterComparison as string) || "",
  };
}

export function resultsToSections(results: OptimizerResults): AccordionSection[] {
  return OPTIMIZER_RESULT_SECTIONS.map(({ key, title }) => ({
    title,
    content: results[key] || "",
  }));
}

/** Short label for version pills (v1, v2, …). */
export function getVersionPillLabel(version: OptimizerVersion): string {
  return `v${version.versionNumber}`;
}

/** Full edit description for tooltips and the active-version summary line. */
export function getVersionEditLabel(version: OptimizerVersion): string {
  if (version.versionNumber === 1) {
    return "Original optimization";
  }

  const instruction =
    version.userInstruction?.trim() || version.refinementLabel?.trim();
  if (instruction) return instruction;

  return `Refinement ${version.versionNumber}`;
}

/** Optional scope hint appended when a refinement targeted one section. */
export function getVersionScopeHint(version: OptimizerVersion): string | null {
  if (!version.targetSection || version.targetSection === "all") {
    return null;
  }
  const label = OPTIMIZER_TARGET_SECTION_OPTIONS.find(
    (o) => o.value === version.targetSection
  )?.label;
  return label ? `Applied to: ${label}` : null;
}

export function buildVersionFromGenerate(
  data: Record<string, unknown>,
  recordId: string
): OptimizerVersion {
  return {
    id: recordId,
    versionNumber: 1,
    createdAt: new Date().toISOString(),
    response: mapApiToOptimizerResults(data),
  };
}

export function buildVersionFromRefine(
  data: Record<string, unknown>,
  instruction: string,
  targetSection: OptimizerTargetSection
): OptimizerVersion {
  return {
    id: (data.versionId as string) || crypto.randomUUID(),
    versionNumber: (data.versionNumber as number) || 1,
    refinementLabel: (data.refinementLabel as string) || undefined,
    userInstruction: instruction.trim(),
    targetSection,
    createdAt: new Date().toISOString(),
    response: mapApiToOptimizerResults(data),
  };
}

export function mapHistoryVersions(
  versions: Array<{
    id: string;
    versionNumber: number;
    refinementLabel?: string;
    userInstruction?: string;
    targetSection?: string;
    createdAt: string;
    response: OptimizerResults;
  }>
): OptimizerVersion[] {
  return versions.map((v) => ({
    id: v.id,
    versionNumber: v.versionNumber,
    refinementLabel: v.refinementLabel,
    userInstruction: v.userInstruction,
    targetSection: v.targetSection as OptimizerVersion["targetSection"],
    createdAt:
      typeof v.createdAt === "string"
        ? v.createdAt
        : new Date(v.createdAt).toISOString(),
    response: v.response,
  }));
}

export function normalizeHistoryRecord(record: {
  id: string;
  parentRecordId?: string;
  originalInput?: {
    fullName?: string;
    professionalTitle?: string;
    content?: string;
  };
  versions?: Parameters<typeof mapHistoryVersions>[0];
}): {
  rootRecordId: string;
  versions: OptimizerVersion[];
  formDefaults: {
    freelancerName: string;
    profileTitle: string;
    profileDescription: string;
  };
} {
  const rootRecordId = record.parentRecordId || record.id;
  const versions = record.versions?.length
    ? mapHistoryVersions(record.versions)
    : [];

  return {
    rootRecordId,
    versions,
    formDefaults: {
      freelancerName: record.originalInput?.fullName || "",
      profileTitle: record.originalInput?.professionalTitle || "",
      profileDescription: record.originalInput?.content || "",
    },
  };
}
