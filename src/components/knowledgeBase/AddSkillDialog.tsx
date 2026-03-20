import { useEffect, useMemo, useState } from "react";
import { GripVertical, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import type { SkillEntry } from "@/types/review";

const SUGGESTED_SKILLS = [
  "Project Management",
  "Project Planning",
  "Prototyping",
  "Python",
  "Software Project Management",
  "Event Project Planning",
  "Hardware Project Management",
  "User Interface Design",
  "User Experience Design",
  "Wireframing",
  "Interaction Design",
  "Research",
  "HTML",
  "CSS",
  "JavaScript",
];

type AddSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  initialSkills: SkillEntry[];
  onSave: (skills: SkillEntry[]) => void;
};

export default function AddSkillDialog({
  open,
  onClose,
  initialSkills,
  onSave,
}: AddSkillDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<SkillEntry[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedSkills(initialSkills);
      setQuery("");
    }
  }, [open, initialSkills]);

  const selectedSkillNames = useMemo(
    () => new Set(selectedSkills.map(skill => skill.name.toLowerCase())),
    [selectedSkills]
  );

  const filteredSuggestions = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    return SUGGESTED_SKILLS.filter(skill => {
      const isAlreadySelected = selectedSkillNames.has(skill.toLowerCase());
      if (isAlreadySelected) return false;
      if (!trimmedQuery) return true;
      return skill.toLowerCase().includes(trimmedQuery);
    }).slice(0, 7);
  }, [query, selectedSkillNames]);

  const canAddCustom = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return false;
    return !selectedSkillNames.has(trimmedQuery.toLowerCase());
  }, [query, selectedSkillNames]);

  const addSkill = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    if (selectedSkillNames.has(trimmedName.toLowerCase())) {
      setQuery("");
      return;
    }

    setSelectedSkills(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: trimmedName,
      },
    ]);
    setQuery("");
  };

  const removeSkill = (id: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const handleSave = () => {
    onSave(selectedSkills);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="border-b border-[#E5E7EB] px-6 py-5 text-left">
          <SheetTitle className="text-[1.75rem] font-semibold text-dark">
            Add Skill
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <label className="mb-2 block text-sm font-medium text-dark">
            Skill <span className="text-[#F04438]">*</span>
          </label>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9CA3AF]" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (filteredSuggestions.length > 0) {
                    addSkill(filteredSuggestions[0]);
                    return;
                  }
                  if (canAddCustom) addSkill(query);
                }
              }}
              placeholder="Search skills e.g. UI design"
              className="h-12 rounded-xl border-[#E5E7EB] pl-10 text-sm"
            />

            {query.trim().length > 0 && filteredSuggestions.length > 0 && (
              <div className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-lg">
                {filteredSuggestions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-secondary transition-colors hover:bg-[#F9FAFB] hover:text-dark"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>

          {query.trim().length === 0 && filteredSuggestions.length > 0 && (
            <div className="mt-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-base font-medium text-dark">
                  Suggested based on your profile
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSuggestions.slice(0, 6).map(skill => (
                  <button
                    key={`suggested-${skill}`}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1 text-xs text-dark transition-colors flex items-center gap-1.5 hover:border-primary hover:text-primary"
                  >
                    <span>{skill}</span>
                    <Plus className="size-3.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 space-y-2">
            {selectedSkills.map(skill => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg px-1 py-1.5"
              >
                <div className="flex items-center gap-2 text-sm text-dark">
                  <GripVertical className="size-4 text-[#6B7280]" />
                  <span>{skill.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="rounded p-1 text-secondary transition-colors hover:bg-[#F3F4F6] hover:text-dark"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 border-t border-[#E5E7EB] px-6 py-4 sm:justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={selectedSkills.length === 0}
            className="h-11 flex-1 rounded-xl"
          >
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
