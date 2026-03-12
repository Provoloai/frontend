import { Plus, SquarePen } from "lucide-react";
import type { ExperienceEntry } from "@/types/review";
import { Button } from "@/components/ui/button";
import experienceImage from "/src/assets/v2/svg/experience.svg";

type Props = {
  entries: ExperienceEntry[];
  onAdd: () => void;
  onEdit: (entry: ExperienceEntry) => void;
};

function formatDateRange(entry: ExperienceEntry) {
  const start = `${entry.startMonth} ${entry.startYear}`.trim();
  if (entry.currentlyWorking) return `${start} - Present`;
  const end = `${entry.endMonth} ${entry.endYear}`.trim();
  return `${start} - ${end}`;
}

export default function ExperienceSection({ entries, onAdd, onEdit }: Props) {
  const isEmpty = entries.length === 0;

  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Experience</h2>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onAdd}
            className="flex items-center gap-1.5 text-sm py-1 px-1.5 text-secondary hover:text-dark transition-colors"
          >
            <Plus size={14} />
            Add
          </Button>
        </div>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center py-6 text-center">
          <img src={experienceImage} alt="Experience" />
          <p className="text-sm text-secondary pt-3 pb-4 max-w-[25rem] w-full">
            Document your work history to create tailored resumes and
            applications.
          </p>
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <Plus size={14} />
            Add experience
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {entries.map(entry => (
            <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#6a7282] uppercase">
                    {formatDateRange(entry)}
                  </p>
                  <h3 className="my-1 font-semibold text-dark">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-[#6a7282]">
                    {entry.company}, {entry.location}
                  </p>
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
              <p className="mt-3 text-sm leading-relaxed text-dark line-clamp-2">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
