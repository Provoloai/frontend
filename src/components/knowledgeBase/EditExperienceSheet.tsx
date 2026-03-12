import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import MonthYearSelect from "./MonthYearSelect";
import { EMPLOYMENT_TYPES } from "@/constants/reviewPlaceholder";
import type { ExperienceEntry } from "@/types/review";

type Props = {
  open: boolean;
  onClose: () => void;
  entry: ExperienceEntry | null;
  onSave: (entry: ExperienceEntry) => void;
};

const emptyEntry: ExperienceEntry = {
  id: "",
  title: "",
  employmentType: "",
  company: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  currentlyWorking: false,
  location: "",
  description: "",
};

export default function EditExperienceSheet({
  open,
  onClose,
  entry,
  onSave,
}: Props) {
  const [form, setForm] = useState<ExperienceEntry>(emptyEntry);
  const isAdding = !entry;

  useEffect(() => {
    setForm(entry ?? { ...emptyEntry, id: crypto.randomUUID() });
  }, [entry]);

  const update = (field: keyof ExperienceEntry, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            {isAdding ? "Add Experience" : "Edit Experience"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          <div>
            <Label>Experience</Label>
            <Input
              value={form.title}
              onChange={e => update("title", e.target.value)}
              placeholder="Ex. Product Designer"
            />
          </div>

          <div>
            <Label>Employment type</Label>
            <Select
              value={form.employmentType}
              onValueChange={v => update("employmentType", v)}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Company</Label>
            <Input
              value={form.company}
              onChange={e => update("company", e.target.value)}
              placeholder="Ex. Provolo AI"
            />
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

          <div className="flex items-center gap-2">
            <Checkbox
              id="currently-working"
              checked={form.currentlyWorking}
              onCheckedChange={v => update("currentlyWorking", !!v)}
            />
            <Label htmlFor="currently-working" className="cursor-pointer">
              Currently working here
            </Label>
          </div>

          {!form.currentlyWorking && (
            <div>
              <Label>
                End date <span className="text-red-500">*</span>
              </Label>
              <MonthYearSelect
                monthValue={form.endMonth}
                yearValue={form.endYear}
                onMonthChange={v => update("endMonth", v)}
                onYearChange={v => update("endYear", v)}
              />
            </div>
          )}

          <div>
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={e => update("location", e.target.value)}
              placeholder="Ex. Lagos, Nigeria"
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
