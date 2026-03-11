import { Plus, SquarePen, Trash2 } from "lucide-react";
import type { ProjectEntry } from "@/types/review";
import { Button } from "@/components/ui/button";

type Props = {
  entries: ProjectEntry[];
  onAdd: () => void;
  onEdit: (entry: ProjectEntry) => void;
  onDelete: (entry: ProjectEntry) => void;
};

function formatDateRange(entry: ProjectEntry) {
  const start = `${entry.startMonth} ${entry.startYear}`.trim();
  if (entry.currentlyWorking) return `${start} - Present`;
  const end = `${entry.endMonth} ${entry.endYear}`.trim();
  if (!end) return start;
  return `${start} - ${end}`;
}

export default function ProjectsSection({
  entries,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Projects</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 text-sm text-secondary hover:text-dark transition-colors"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {entries.map(entry => (
          <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-sm font-semibold text-dark">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  {entry.description}
                </p>
                <p className="mt-1 text-xs text-secondary">
                  {formatDateRange(entry)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  onClick={() => onEdit(entry)}
                  className="flex items-center gap-1.5 text-sm text-secondary hover:text-dark transition-colors py-1 px-1.5"
                >
                  <SquarePen size={14} />
                  Edit
                </Button>
                <button
                  onClick={() => onDelete(entry)}
                  className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
