import { Plus, SquarePen, Trash2 } from "lucide-react";
import type { CertificationEntry } from "@/types/review";
import { Button } from "@/components/ui/button";
import licenseImage from "/src/assets/v2/svg/license.svg";

type Props = {
  entries: CertificationEntry[];
  onAdd: () => void;
  onEdit: (entry: CertificationEntry) => void;
  onDelete: (entry: CertificationEntry) => void;
};

function formatIssueDate(entry: CertificationEntry) {
  const parts = [entry.issueMonth, entry.issueYear].filter(Boolean);
  return parts.length > 0 ? `Issued ${parts.join(" ")}` : "";
}

export default function CertificationsSection({
  entries,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const isEmpty = entries.length === 0;

  return (
    <section className="rounded-2xl shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-dark">
          License & Certifications
        </h2>
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
          <img src={licenseImage} alt="License" />

          <p className="text-sm text-secondary pt-3 pb-4 max-w-[25rem] w-full">
            List your training, certifications, and technical proficiencies.
          </p>
          <button
            onClick={onAdd}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <Plus size={14} />
            Add licence
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#E5E7EB]">
          {entries.map(entry => (
            <div key={entry.id} className="group py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-dark">{entry.name}</h3>
                  <p className="text-sm my-0.5 text-secondary">
                    {entry.issuingOrganization}
                  </p>
                  {formatIssueDate(entry) && (
                    <p className="text-sm text-secondary">
                      {formatIssueDate(entry)}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3 opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                  <Button
                    variant="outline"
                    onClick={() => onEdit(entry)}
                    className="flex items-center gap-1.5 py-1.5 px-3 text-sm text-secondary hover:text-dark rounded-[0.75rem]"
                  >
                    <SquarePen size={14} />
                    Edit
                  </Button>
                  <button
                    onClick={() => onDelete(entry)}
                    className="flex items-center gap-1.5 text-sm py-1.5 px-3 text-[#8B0836] transition-colors hover:text-red-700 border border-[#FFCCD3] bg-[#FEF0F2] shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] rounded-[0.75rem]"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
