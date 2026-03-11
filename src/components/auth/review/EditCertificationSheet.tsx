import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MonthYearSelect from "./MonthYearSelect";
import type { CertificationEntry } from "@/types/review";

type Props = {
  open: boolean;
  onClose: () => void;
  entry: CertificationEntry | null;
  onSave: (entry: CertificationEntry) => void;
};

const emptyEntry: CertificationEntry = {
  id: "",
  name: "",
  issuingOrganization: "",
  issueMonth: "",
  issueYear: "",
  expirationMonth: "",
  expirationYear: "",
  credentialId: "",
  credentialUrl: "",
};

export default function EditCertificationSheet({
  open,
  onClose,
  entry,
  onSave,
}: Props) {
  const [form, setForm] = useState<CertificationEntry>(emptyEntry);
  const isAdding = !entry;

  useEffect(() => {
    setForm(entry ?? { ...emptyEntry, id: crypto.randomUUID() });
  }, [entry]);

  const update = (field: keyof CertificationEntry, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col ">
        <SheetHeader>
          <SheetTitle>
            {isAdding
              ? "Add Licence or Certifications"
              : "Edit Licence or Certifications"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          <div>
            <Label>
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Ex. Google UX Certificate"
            />
          </div>

          <div>
            <Label>
              Issuing organization <span className="text-red-500">*</span>
            </Label>
            <Input
              value={form.issuingOrganization}
              onChange={e => update("issuingOrganization", e.target.value)}
              placeholder="Ex. Google"
            />
          </div>

          <div>
            <Label>
              Issue date <span className="text-red-500">*</span>
            </Label>
            <MonthYearSelect
              monthValue={form.issueMonth}
              yearValue={form.issueYear}
              onMonthChange={v => update("issueMonth", v)}
              onYearChange={v => update("issueYear", v)}
            />
          </div>

          <div>
            <Label>Expiration date</Label>
            <MonthYearSelect
              monthValue={form.expirationMonth}
              yearValue={form.expirationYear}
              onMonthChange={v => update("expirationMonth", v)}
              onYearChange={v => update("expirationYear", v)}
            />
          </div>

          <div>
            <Label>Credential ID</Label>
            <Input
              value={form.credentialId}
              onChange={e => update("credentialId", e.target.value)}
              placeholder="Ex. G21589UX"
            />
          </div>

          <div>
            <Label>Credential URL</Label>
            <div className="flex overflow-hidden rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <span className="flex items-center border-r border-input bg-gray-50 px-3 text-sm text-secondary select-none">
                https://
              </span>
              <input
                type="text"
                value={form.credentialUrl}
                onChange={e => update("credentialUrl", e.target.value)}
                placeholder="Enter url"
                className="flex-1 bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <Label>
              Upload file <span className="text-red-500">*</span>
            </Label>
            <Input type="file" accept=".jpg,.jpeg,.png" />
            <p className="mt-1 text-xs text-muted-foreground">
              JPEG, PNG, or JPG (MAX. 800x400px).
            </p>
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
