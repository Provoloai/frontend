import { Plus, SquarePen } from "lucide-react";
import type { CertificationEntry } from "@/types/review";
import { Button } from "@/components/ui/button";
import licenseImage from "/src/assets/v2/svg/license.svg";

type Props = {
  entries: CertificationEntry[];
  onAdd: () => void;
  onEdit: (entry: CertificationEntry) => void;
};

function formatIssueDate(entry: CertificationEntry) {
  const parts = [entry.issueMonth, entry.issueYear].filter(Boolean);
  return parts.length > 0 ? `Issued ${parts.join(" ")}` : "";
}

export default function CertificationsSection({
  entries,
  onAdd,
  onEdit,
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
            <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
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
      )}
    </section>
  );
}
