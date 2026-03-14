import { useState, useEffect, useRef } from "react";
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
import { Camera } from "lucide-react";

export interface PersonalInfoData {
  displayName: string;
  role: string;
  school: string;
  photoUrl?: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
  initialData: PersonalInfoData;
  onSave: (data: PersonalInfoData) => void;
};

export default function EditPersonalInfoSheet({
  open,
  onClose,
  initialData,
  onSave,
}: Props) {
  const [form, setForm] = useState<PersonalInfoData>(initialData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (field: keyof PersonalInfoData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm(prev => ({ ...prev, photoUrl: url }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Personal Information</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          {/* Profile photo */}
          <div className="space-y-2">
            <Label>Profile photo</Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center size-24 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors border border-dashed border-[#D1D5DB]"
              aria-label="Upload profile photo"
            >
              {form.photoUrl ? (
                <img
                  src={form.photoUrl}
                  alt="Profile"
                  className="size-20 rounded-full object-cover"
                />
              ) : (
                <Camera size={20} className="text-secondary" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Fullname */}
          <div className="space-y-1.5">
            <Label htmlFor="pi-fullname">Fullname</Label>
            <Input
              id="pi-fullname"
              value={form.displayName}
              onChange={e => handleChange("displayName", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          {/* Headline */}
          <div className="space-y-1.5">
            <Label htmlFor="pi-headline">Headline</Label>
            <Input
              id="pi-headline"
              value={form.role}
              onChange={e => handleChange("role", e.target.value)}
              placeholder="Design Engineer | UX Designer"
            />
          </div>

          {/* School */}
          <div className="space-y-1.5">
            <Label htmlFor="pi-school">School</Label>
            <Input
              id="pi-school"
              value={form.school}
              onChange={e => handleChange("school", e.target.value)}
              placeholder="Ex. Lagos State University"
            />
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Next
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
