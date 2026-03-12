import type { SkillEntry } from "@/types/review";

type Props = {
  skills: SkillEntry[];
};

export default function SkillsSection({ skills }: Props) {
  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">Skills</h2>
      </div>

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
    </section>
  );
}
