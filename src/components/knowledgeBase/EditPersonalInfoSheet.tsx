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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PersonalInfoData {
  displayName: string;
  role: string;
  country: string;
  state: string;
  website: string;
  photoUrl?: string;
}

const COUNTRIES = ["Nigeria", "United States", "United Kingdom", "Canada"];
const STATES = ["Lagos", "Abuja", "Oyo", "Rivers", "Kano"];

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

  const initials = form.displayName
    .split(" ")
    .filter(Boolean)
    .map(name => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="border-b border-[#E5E7EB] px-6 py-5 text-left">
          <SheetTitle>Personal Information</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {/* Profile photo */}
          <div className="space-y-2">
            <Label>Profile photo</Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex size-20 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F3F4F6] text-2xl font-semibold text-[#4B5563] transition-colors hover:bg-[#E5E7EB]"
              aria-label="Upload profile photo"
            >
              {form.photoUrl ? (
                <img
                  src={form.photoUrl}
                  alt="Profile"
                  className="size-20 rounded-full object-cover"
                />
              ) : (
                <span>{initials || "SA"}</span>
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
              placeholder="e.g Product Designer"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label>Location</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={form.country}
                onValueChange={value => handleChange("country", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={form.state}
                onValueChange={value => handleChange("state", value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map(state => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Website */}
          <div className="space-y-1.5">
            <Label htmlFor="pi-website">Website</Label>
            <div className="flex overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
              <span className="flex items-center border-r border-[#E5E7EB] px-3 text-sm text-secondary">
                https://
              </span>
              <input
                id="pi-website"
                value={form.website}
                onChange={e => handleChange("website", e.target.value)}
                placeholder="Enter website url"
                className="h-10 flex-1 bg-transparent px-3 text-sm text-dark outline-none placeholder:text-secondary"
              />
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-3 border-t border-[#E5E7EB] px-6 py-4 sm:justify-start">
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
