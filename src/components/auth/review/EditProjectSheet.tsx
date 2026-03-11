import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import MonthYearSelect from "./MonthYearSelect";
import type { ProjectEntry } from "@/types/review";

type Props = {
  open: boolean;
  onClose: () => void;
  entry: ProjectEntry | null;
  onSave: (entry: ProjectEntry) => void;
};

const emptyEntry: ProjectEntry = {
  id: "",
  title: "",
  description: "",
  currentlyWorking: false,
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  projectLink: "",
};

export default function EditProjectSheet({
  open,
  onClose,
  entry,
  onSave,
}: Props) {
  const [form, setForm] = useState<ProjectEntry>(emptyEntry);
  const isAdding = !entry;

  useEffect(() => {
    setForm(entry ?? { ...emptyEntry, id: crypto.randomUUID() });
  }, [entry]);

  const update = (field: keyof ProjectEntry, value: string | boolean) => {
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
          <SheetTitle>{isAdding ? "Add Project" : "Edit Project"}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          <div>
            <Label>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={form.title}
              onChange={e => update("title", e.target.value)}
              placeholder="Ex. Provolo AI Website"
            />
          </div>

          <div>
            <Label>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={form.description}
              onChange={e => update("description", e.target.value)}
              placeholder="Write text here ..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="currently-working-project"
              checked={form.currentlyWorking}
              onCheckedChange={v => update("currentlyWorking", !!v)}
            />
            <Label
              htmlFor="currently-working-project"
              className="cursor-pointer"
            >
              I am currently working on this project
            </Label>
          </div>

          <div>
            <Label>
              Start date <span className="text-red-500">*</span>
            </Label>
            <MonthYearSelect
              monthValue={form.startMonth}
              yearValue={form.startYear}
              onMonthChange={v => update("startMonth", v)}
              onYearChange={v => update("startYear", v)}
            />
          </div>

          <div>
            <Label>
              End date <span className="text-red-500">*</span>
            </Label>
            <MonthYearSelect
              monthValue={form.endMonth}
              yearValue={form.endYear}
              onMonthChange={v => update("endMonth", v)}
              onYearChange={v => update("endYear", v)}
              disabled={form.currentlyWorking}
            />
          </div>

          <div>
            <Label>Project link</Label>
            <div className="flex overflow-hidden rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <span className="flex items-center border-r border-input bg-gray-50 px-3 text-sm text-secondary select-none">
                https://
              </span>
              <input
                type="text"
                value={form.projectLink}
                onChange={e => update("projectLink", e.target.value)}
                placeholder="Enter url"
                className="flex-1 bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <Label>
              Upload file <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-6 text-center cursor-pointer hover:border-gray-300 transition-colors">
              <Upload size={24} className="mb-2 text-secondary" />
              <p className="text-sm text-secondary">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Max. File Size: 30MB
              </p>
            </div>
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
