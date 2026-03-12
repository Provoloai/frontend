import { SquarePen, Plus } from "lucide-react";
import type { ProfessionalSummary } from "@/types/review";
import { Button } from "@/components/ui/button";
import professionalImage from "/src/assets/v2/svg/professional-summary.svg";

type Props = {
  summary: ProfessionalSummary;
  onEdit: () => void;
};

export default function ProfessionalSummarySection({ summary, onEdit }: Props) {
  const isEmpty = !summary.text;

  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">
          Professional Summary
        </h2>
        <Button
          variant="outline"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-sm text-secondary hover:text-dark transition-colors py-1 px-1.5"
        >
          <SquarePen size={14} />
          Edit
        </Button>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center py-6 text-center">
          <img src={professionalImage} alt="Professional Summary" />
          <p className="text-sm text-secondary pt-3 pb-4 max-w-[25rem] w-full">
            Document your work history to create tailored resumes and
            applications.
          </p>
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <Plus size={14} />
            Add bio
          </button>
        </div>
      ) : (
        <p className="text-base text-secondary">{summary.text}</p>
      )}
    </section>
  );
}
