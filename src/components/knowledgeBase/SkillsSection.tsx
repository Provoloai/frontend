import { Plus } from "lucide-react";
import type { SkillEntry } from "@/types/review";
import skillImage from "/src/assets/v2/svg/skills.svg";
import { Button } from "../ui/button";

type Props = {
  skills: SkillEntry[];
  onAdd?: () => void;
};

export default function SkillsSection({ skills, onAdd }: Props) {
  const isEmpty = skills.length === 0;

  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Skills</h2>
        {onAdd && (
          <Button
            variant="outline"
            onClick={onAdd}
            className="flex items-center gap-1.5 text-sm py-1 px-1.5 text-secondary hover:text-dark transition-colors"
          >
            <Plus size={14} />
            Add
          </Button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center py-6 text-center">
          <img src={skillImage} alt="Skills" />
          <p className="text-sm text-secondary pt-3 pb-4 max-w-[23rem] w-full">
            Highlight your key skills to showcase what makes you unique.
          </p>
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Plus size={14} />
              Add skills
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <span
              key={skill.id}
              className="rounded-[0.375rem] border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1 text-sm text-dark"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
