import { Plus, SquarePen } from "lucide-react";
import type { EducationEntry } from "@/types/review";
import { Button } from "@/components/ui/button";

type Props = {
  entries: EducationEntry[];
  onAdd: () => void;
  onEdit: (entry: EducationEntry) => void;
};

export default function EducationSection({ entries, onAdd, onEdit }: Props) {
  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Education</h2>
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

      <div className="divide-y divide-[#E5E7EB]">
        {entries.map(entry => (
          <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6A7282] font-medium">
                  {entry.startDate} - {entry.endDate}
                </p>
                <h3 className="my-1 font-semibold text-dark">{entry.degree}</h3>
                <p className="text-sm text-[#6A7282]">{entry.school}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => onEdit(entry)}
                className="flex items-center gap-1.5 text-sm text-secondary hover:text-dark transition-colors py-1 px-1.5"
              >
                <SquarePen size={14} />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
