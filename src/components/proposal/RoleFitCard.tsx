import type { RoleFitAssessment } from "@/types";

const ROLE_FIT_STYLES: Record<
  RoleFitAssessment["fitLevel"],
  { label: string; badge: string; ring: string }
> = {
  strong: {
    label: "Strong fit",
    badge: "bg-green-100 text-green-800",
    ring: "ring-green-200",
  },
  moderate: {
    label: "Moderate fit",
    badge: "bg-amber-100 text-amber-800",
    ring: "ring-amber-200",
  },
  weak: {
    label: "Weak fit",
    badge: "bg-red-100 text-red-800",
    ring: "ring-red-200",
  },
};

export default function RoleFitCard({ roleFit }: { roleFit: RoleFitAssessment }) {
  const style = ROLE_FIT_STYLES[roleFit.fitLevel] ?? ROLE_FIT_STYLES.moderate;

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 ring-1 ${style.ring}`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h4 className="font-medium text-gray-900">Role fit</h4>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}
        >
          {style.label} · {roleFit.fitScore}/10
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{roleFit.summary}</p>
      {roleFit.strengths.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Strengths
          </p>
          <ul className="space-y-1">
            {roleFit.strengths.map((item, i) => (
              <li key={i} className="text-sm text-gray-700">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {roleFit.gaps.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Gaps
          </p>
          <ul className="space-y-1">
            {roleFit.gaps.map((item, i) => (
              <li key={i} className="text-sm text-gray-700">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {roleFit.recommendation && (
        <p className="text-sm text-gray-600 border-t border-gray-100 pt-3">
          <span className="font-medium text-gray-800">Recommendation: </span>
          {roleFit.recommendation}
        </p>
      )}
    </div>
  );
}
