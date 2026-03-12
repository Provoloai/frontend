import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Upload, Search, Plus, SquarePen } from "lucide-react";
import isURL from "validator/es/lib/isURL";
import LogoSvg from "@/assets/svg/LogoSvg";
import { PLACEHOLDER_PROFILE } from "@/constants/reviewPlaceholder";
import type { ReviewProfileData, ExperienceEntry } from "@/types/review";

type Step = "profile-link" | "loading" | "review";

type Props = {
  open: boolean;
  onClose: () => void;
  onImport: (data: ReviewProfileData) => void;
};

const STEPS: { key: Step; label: string }[] = [
  { key: "profile-link", label: "Profile link" },
  { key: "review", label: "Review" },
];

function Stepper({ current }: { current: Step }) {
  const currentIdx = STEPS.findIndex(s => s.key === current);
  // loading step sits between 1→2: step 1 is checked
  const loadingIdx = current === "loading" ? 1 : currentIdx;

  return (
    <div className="flex items-center gap-3 py-2">
      {STEPS.map((step, i) => {
        const done = current === "loading" ? i === 0 : i < currentIdx;
        const active = current === "loading" ? false : i === currentIdx;

        return (
          <div key={step.key} className="flex items-center gap-2">
            {/* connector */}
            {i > 0 && (
              <div
                className={`h-px w-10 transition-colors ${
                  i <= loadingIdx ? "bg-primary" : "bg-[#E5E7EB]"
                }`}
              />
            )}

            {/* circle */}
            <div
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                done
                  ? "bg-primary/10 text-primary"
                  : active
                    ? "bg-primary/10 text-primary"
                    : "bg-[#F3F4F6] text-secondary"
              }`}
            >
              {done ? <CheckCircle2 size={16} /> : i + 1}
            </div>

            {/* label */}
            <span
              className={`text-sm font-medium ${
                done || active ? "text-primary" : "text-secondary"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const ACCEPTED_FILE_TYPES = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
];

function ProfileLinkStep({
  url,
  setUrl,
  file,
  setFile,
}: {
  url: string;
  setUrl: (v: string) => void;
  file: File | null;
  setFile: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const f = e.dataTransfer.files?.[0];
      if (f && f.size <= 30 * 1024 * 1024) setFile(f);
    },
    [setFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-secondary">
        Upload profile link (Linkedin, Twitter, Instagram, Upwork, etc.) or your
        resume to update your knowledge base with latest information about you.
      </p>

      {/* URL input */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-dark">
          Profile URL
        </label>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <span className="flex select-none items-center border-r border-[#E5E7EB] bg-[#F3F4F6] px-3 text-sm text-secondary">
            https://
          </span>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter url"
            className="flex-1 bg-[#F9FAFB] px-3 py-2.5 text-sm text-dark outline-none placeholder:text-gray-400"
            autoComplete="url"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-[#E5E7EB]" />
        <span className="text-xs text-secondary">or</span>
        <div className="flex-1 border-t border-[#E5E7EB]" />
      </div>

      {/* File upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-dark">
          Upload file
        </label>
        <div
          onDragOver={e => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-[#E5E7EB] bg-[#FAFAFA]"
          }`}
        >
          <Upload size={24} className="mb-2 text-secondary" />
          <p className="mb-1 text-sm text-secondary">
            Click to upload or drag and drop
          </p>
          <p className="mb-3 text-xs text-secondary/70">Max. File Size: 30MB</p>

          <Button
            type="button"
            size="sm"
            className="gap-1.5 rounded-lg text-xs"
            onClick={() => inputRef.current?.click()}
          >
            <Search size={12} />
            Browse file
          </Button>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={ACCEPTED_FILE_TYPES.join(",")}
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <p className="mt-2 truncate text-xs text-secondary">
            Selected: {file.name}
          </p>
        )}

        <p className="mt-2 text-xs text-secondary/70">
          SVG, PNG, JPG or GIF (MAX. 800×400px).
        </p>
      </div>
    </div>
  );
}

function LoadingStep() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin-slow mb-4 rounded-full bg-gray-200">
        <LogoSvg className="size-16 text-white" />
      </div>
      <p className="text-sm text-secondary">Collecting your profile data...</p>
    </div>
  );
}

function formatDateRange(entry: ExperienceEntry) {
  const start = `${entry.startYear}`.trim();
  if (entry.currentlyWorking) return `${start} · NOW`;
  const end = `${entry.endYear}`.trim();
  return `${start} · ${end}`;
}

function ReviewStep({ data }: { data: ReviewProfileData }) {
  return (
    <div className="space-y-4">
      {/* Summary */}
      {data.summary.text && (
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-dark">Professional Summary</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-secondary transition-colors hover:text-dark">
              <SquarePen size={12} />
              Edit
            </button>
          </div>
          <p className="line-clamp-6 text-sm leading-relaxed text-secondary">
            {data.summary.text}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-dark">Experience</h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs font-medium text-secondary transition-colors hover:text-dark">
                <Plus size={12} />
                Add
              </button>
              <button className="flex items-center gap-1 text-xs font-medium text-secondary transition-colors hover:text-dark">
                <SquarePen size={12} />
                Edit
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {data.experience.map(entry => (
              <div key={entry.id} className="py-3 first:pt-0 last:pb-0">
                <p className="text-xs uppercase text-[#6a7282]">
                  {formatDateRange(entry)}
                </p>
                <h4 className="mt-0.5 text-sm font-semibold text-dark">
                  {entry.title}
                </h4>
                <p className="text-xs text-[#6a7282]">
                  {entry.company}, {entry.location}
                </p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-secondary">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <h3 className="mb-3 font-semibold text-dark">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-secondary"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-dark">Education</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-secondary transition-colors hover:text-dark">
              <SquarePen size={12} />
              Edit
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {data.education.map(entry => (
              <div key={entry.id} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-semibold text-dark">
                  {entry.school}
                </h4>
                <p className="text-xs text-[#6a7282]">
                  {entry.degree} · {entry.fieldOfStudy}
                </p>
                <p className="text-xs text-[#6a7282]">
                  {entry.startDate} – {entry.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ImportDataDialog({ open, onClose, onImport }: Props) {
  const [step, setStep] = useState<Step>("profile-link");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [importedData, setImportedData] = useState<ReviewProfileData | null>(
    null
  );

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("profile-link");
        setUrl("");
        setFile(null);
        setImportedData(null);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const isUrlValid =
    !!url &&
    isURL(url, {
      require_protocol: false,
      require_tld: true,
      allow_underscores: true,
    });

  const canProceedStep1 = isUrlValid || !!file;

  const handleNext = () => {
    if (step === "profile-link") {
      setStep("loading");
      // Simulate data collection — replace with real API later
      setTimeout(() => {
        setImportedData(PLACEHOLDER_PROFILE);
        setStep("review");
      }, 2400);
    }
  };

  const handleBack = () => {
    if (step === "review" || step === "loading") {
      setStep("profile-link");
      setImportedData(null);
    }
  };

  const handleSave = () => {
    if (importedData) {
      onImport(importedData);
    }
    onClose();
  };

  const isReview = step === "review";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Import data</SheetTitle>
        </SheetHeader>

        {/* Stepper */}
        <div className="pt-1">
          <Stepper current={step} />
        </div>

        {/* Body — animated transitions between steps */}
        <div className="flex-1 overflow-y-auto py-4">
          <AnimatePresence mode="wait">
            {step === "profile-link" && (
              <motion.div
                key="profile-link"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <ProfileLinkStep
                  url={url}
                  setUrl={setUrl}
                  file={file}
                  setFile={setFile}
                />
              </motion.div>
            )}

            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <LoadingStep />
              </motion.div>
            )}

            {step === "review" && importedData && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <ReviewStep data={importedData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <SheetFooter className="flex-row gap-3 border-t pt-4">
          {step === "profile-link" ? (
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          ) : (
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleBack}
              disabled={step === "loading"}
            >
              Back
            </Button>
          )}

          {isReview ? (
            <Button className="flex-1" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button
              className="flex-1"
              disabled={!canProceedStep1 || step === "loading"}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
