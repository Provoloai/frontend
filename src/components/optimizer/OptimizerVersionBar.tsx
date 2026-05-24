import type { OptimizerVersion } from "@/types/optimizer";
import {
  getVersionEditLabel,
  getVersionPillLabel,
  getVersionScopeHint,
} from "@/utils/optimizer.util";

interface OptimizerVersionBarProps {
  versions: OptimizerVersion[];
  currentVersionIndex: number;
  onVersionSelect: (index: number) => void;
}

const OptimizerVersionBar: React.FC<OptimizerVersionBarProps> = ({
  versions,
  currentVersionIndex,
  onVersionSelect,
}) => {
  const currentVersion = versions[currentVersionIndex];
  if (!currentVersion) return null;

  const editLabel = getVersionEditLabel(currentVersion);
  const scopeHint = getVersionScopeHint(currentVersion);

  return (
    <div className="px-4 pt-6 max-w-3xl mx-auto w-full">
      {versions.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {versions.map((version, index) => (
            <button
              key={version.id}
              type="button"
              title={getVersionEditLabel(version)}
              onClick={() => onVersionSelect(index)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                index === currentVersionIndex
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
            >
              {getVersionPillLabel(version)}
            </button>
          ))}
        </div>
      )}

      <div className="mb-4 min-h-[1.25rem]">
        <p className="text-sm text-gray-700 truncate" title={editLabel}>
          {editLabel}
        </p>
        {scopeHint && (
          <p className="text-xs text-gray-500 mt-0.5 truncate">{scopeHint}</p>
        )}
      </div>
    </div>
  );
};

export default OptimizerVersionBar;
