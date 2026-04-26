import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import type { EducationEntry } from "@/types/review";

type Props = {
  open: boolean;
  onClose: () => void;
  entry: EducationEntry | null;
  onSave: (entry: EducationEntry) => void | Promise<void>;
};

const emptyEntry: EducationEntry = {
  id: "",
  school: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
};

export default function EditEducationSheet({
  open,
  onClose,
  entry,
  onSave,
}: Props) {
  const [form, setForm] = useState<EducationEntry>(emptyEntry);
  const [isSaving, setIsSaving] = useState(false);
  const isAdding = !entry;

  useEffect(() => {
    setForm(entry ?? { ...emptyEntry, id: crypto.randomUUID() });
  }, [entry]);

  const update = (field: keyof EducationEntry, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (e) {
      // Handled by parent
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col ">
        <SheetHeader>
          <SheetTitle>
            {isAdding ? "Add Education" : "Edit Education"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          <div>
            <Label>School</Label>
            <Input
              value={form.school}
              onChange={e => update("school", e.target.value)}
              placeholder="Ex. Lagos State University"
            />
          </div>

          <div>
            <Label>Degree</Label>
            <Input
              value={form.degree}
              onChange={e => update("degree", e.target.value)}
              placeholder="Ex. Bachelor of Science"
            />
          </div>

          <div>
            <Label>Field of study</Label>
            <Input
              value={form.fieldOfStudy}
              onChange={e => update("fieldOfStudy", e.target.value)}
              placeholder="Ex. Microbiology"
            />
          </div>

          <div>
            <Label>Start date</Label>
            <Input
              type="date"
              value={form.startDate}
              onChange={e => update("startDate", e.target.value)}
            />
          </div>

          <div>
            <Label>End date or expected</Label>
            <Input
              type="date"
              value={form.endDate}
              onChange={e => update("endDate", e.target.value)}
            />
          </div>

          <div>
            <Label>Grade</Label>
            <Input
              value={form.grade}
              onChange={e => update("grade", e.target.value)}
              placeholder="CGPA"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={e => update("description", e.target.value)}
              placeholder="Write text here ..."
              className="min-h-[120px] resize-none"
            />
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 flex items-center gap-2" disabled={isSaving}>
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
