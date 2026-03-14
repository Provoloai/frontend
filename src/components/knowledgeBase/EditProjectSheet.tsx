import { useState, useEffect, useRef, useCallback } from "react";
import { Upload, Search, X } from "lucide-react";
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
  files: [],
};

export default function EditProjectSheet({
  open,
  onClose,
  entry,
  onSave,
}: Props) {
  const [form, setForm] = useState<ProjectEntry>(emptyEntry);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isAdding = !entry;

  useEffect(() => {
    setForm(entry ?? { ...emptyEntry, id: crypto.randomUUID() });
  }, [entry]);

  const update = (field: keyof ProjectEntry, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
    }));
    setForm(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
  }, []);

  const removeFile = (id: string) => {
    setForm(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== id),
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
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

            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-1.5 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors bg-[#F9FAFB] ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-[#E5E7EB] hover:border-gray-300"
              }`}
            >
              <Upload size={24} className="mb-2 text-[#6A7282]" />
              <p className="text-sm text-[#6A7282]">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-[#6A7282]">
                Max. File Size: 30MB
              </p>
              <Button
                type="button"
                className="mt-4 gap-1.5 pointer-events-none rounded-xl py-1.5 px-3"
              >
                <Search size={13} />
                Browse file
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              multiple
              className="hidden"
              onChange={e => addFiles(e.target.files)}
            />

            <p className="mt-1.5 text-xs text-secondary">
              JPEG, PNG, or JPG (MAX. 800×400px).
            </p>

            {/* Thumbnails */}
            {form.files.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.files.map(file => (
                  <div key={file.id} className="relative">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-16 w-24 rounded-md object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-900 transition-colors"
                      aria-label="Remove file"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
