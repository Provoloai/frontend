import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER_PROFILE } from "@/constants/reviewPlaceholder";
import type {
  ReviewProfileData,
  ExperienceEntry,
  EducationEntry,
  CertificationEntry,
  ProjectEntry,
} from "@/types/review";

import ProfessionalSummarySection from "@/components/auth/review/ProfessionalSummarySection";
import ExperienceSection from "@/components/auth/review/ExperienceSection";
import SkillsSection from "@/components/auth/review/SkillsSection";
import EducationSection from "@/components/auth/review/EducationSection";
import CertificationsSection from "@/components/auth/review/CertificationsSection";
import ProjectsSection from "@/components/auth/review/ProjectsSection";

import EditSummarySheet from "@/components/auth/review/EditSummarySheet";
import EditExperienceSheet from "@/components/auth/review/EditExperienceSheet";
import EditEducationSheet from "@/components/auth/review/EditEducationSheet";
import EditCertificationSheet from "@/components/auth/review/EditCertificationSheet";
import EditProjectSheet from "@/components/auth/review/EditProjectSheet";
import DeleteConfirmDialog from "@/components/auth/review/DeleteConfirmDialog";
import ToastProvider from "@/components/auth/review/ToastProvider";
import { useToast } from "@/components/auth/review/useToast";

import desktopLogo from "/src/assets/v2/svg/desktop-logo.svg";

// TODO: replace with real user data from session
const PLACEHOLDER_USER = {
  displayName: "Jese Leos",
  email: "name@flowbite.com",
};

type SheetState =
  | { type: "none" }
  | { type: "summary" }
  | { type: "experience"; entry: ExperienceEntry | null }
  | { type: "education"; entry: EducationEntry | null }
  | { type: "certification"; entry: CertificationEntry | null }
  | { type: "project"; entry: ProjectEntry | null };

type DeleteState = { type: "none" } | { type: "project"; entry: ProjectEntry };

export default function OnboardingReview() {
  return (
    <ToastProvider>
      <OnboardingReviewContent />
    </ToastProvider>
  );
}

function OnboardingReviewContent() {
  const { toast } = useToast();
  const [profile, setProfile] =
    useState<ReviewProfileData>(PLACEHOLDER_PROFILE);
  const [sheet, setSheet] = useState<SheetState>({ type: "none" });
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    type: "none",
  });

  const closeSheet = () => setSheet({ type: "none" });

  // — Summary handlers —
  const handleSaveSummary = (text: string) => {
    setProfile(prev => ({ ...prev, summary: { text } }));
    toast("Summary updated successfully!");
  };

  // — Experience handlers —
  const handleSaveExperience = (entry: ExperienceEntry) => {
    setProfile(prev => {
      const exists = prev.experience.find(e => e.id === entry.id);
      toast(
        exists
          ? "Experience updated successfully!"
          : "Experience added successfully!"
      );
      return {
        ...prev,
        experience: exists
          ? prev.experience.map(e => (e.id === entry.id ? entry : e))
          : [...prev.experience, entry],
      };
    });
  };

  // — Education handlers —
  const handleSaveEducation = (entry: EducationEntry) => {
    setProfile(prev => {
      const exists = prev.education.find(e => e.id === entry.id);
      toast(
        exists
          ? "Education updated successfully!"
          : "Education added successfully!"
      );
      return {
        ...prev,
        education: exists
          ? prev.education.map(e => (e.id === entry.id ? entry : e))
          : [...prev.education, entry],
      };
    });
  };

  // — Certification handlers —
  const handleSaveCertification = (entry: CertificationEntry) => {
    setProfile(prev => {
      const exists = prev.certifications.find(e => e.id === entry.id);
      toast(
        exists
          ? "Certification updated successfully!"
          : "Certification added successfully!"
      );
      return {
        ...prev,
        certifications: exists
          ? prev.certifications.map(e => (e.id === entry.id ? entry : e))
          : [...prev.certifications, entry],
      };
    });
  };

  // — Project handlers —
  const handleSaveProject = (entry: ProjectEntry) => {
    setProfile(prev => {
      const exists = prev.projects.find(e => e.id === entry.id);
      toast(
        exists ? "Project updated successfully!" : "Project added successfully!"
      );
      return {
        ...prev,
        projects: exists
          ? prev.projects.map(e => (e.id === entry.id ? entry : e))
          : [...prev.projects, entry],
      };
    });
  };

  const handleConfirmDeleteProject = () => {
    if (deleteDialog.type === "project") {
      setProfile(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== deleteDialog.entry.id),
      }));
      toast("Project deleted successfully!");
    }
    setDeleteDialog({ type: "none" });
  };

  const { displayName, email } = PLACEHOLDER_USER;
  const initials = displayName
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-dvh flex-col bg-[#F3F4F6]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 mobile:px-4">
        <img src={desktopLogo} alt="Provolo" className="h-7" />

        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-xs font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight mobile:hidden">
            <span className="font-medium text-dark">{displayName}</span>
            <span className="text-sm text-secondary">{email}</span>
          </div>
          <ChevronDown size={16} className="text-secondary mobile:hidden" />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 mobile:px-4 mobile:py-6">
        <h1 className="mb-6 text-2xl font-semibold text-dark">
          Review Profile Information
        </h1>

        <div className="space-y-6">
          <ProfessionalSummarySection
            summary={profile.summary}
            onEdit={() => setSheet({ type: "summary" })}
          />

          <ExperienceSection
            entries={profile.experience}
            onAdd={() => setSheet({ type: "experience", entry: null })}
            onEdit={entry => setSheet({ type: "experience", entry })}
          />

          <SkillsSection skills={profile.skills} />

          <EducationSection
            entries={profile.education}
            onAdd={() => setSheet({ type: "education", entry: null })}
            onEdit={entry => setSheet({ type: "education", entry })}
          />

          <CertificationsSection
            entries={profile.certifications}
            onAdd={() => setSheet({ type: "certification", entry: null })}
            onEdit={entry => setSheet({ type: "certification", entry })}
          />

          <ProjectsSection
            entries={profile.projects}
            onAdd={() => setSheet({ type: "project", entry: null })}
            onEdit={entry => setSheet({ type: "project", entry })}
            onDelete={entry => setDeleteDialog({ type: "project", entry })}
          />
        </div>
      </main>

      {/* Bottom bar */}
      <div className="sticky bottom-0 border-t border-gray-200 bg-white px-8 py-4 mobile:px-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/knowledge-base">
            <Button
              variant="outline"
              className="py-2.5 px-4 rounded-xl bg-[#f9fafb]"
            >
              Skip
            </Button>
          </Link>
          <Button
            className="py-2.5 px-4 rounded-xl"
            onClick={() => {
              // TODO: wire up save API
              console.log("Save profile:", profile);
            }}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Sheet modals */}
      <EditSummarySheet
        open={sheet.type === "summary"}
        onClose={closeSheet}
        initialText={profile.summary.text}
        onSave={handleSaveSummary}
      />

      <EditExperienceSheet
        open={sheet.type === "experience"}
        onClose={closeSheet}
        entry={sheet.type === "experience" ? sheet.entry : null}
        onSave={handleSaveExperience}
      />

      <EditEducationSheet
        open={sheet.type === "education"}
        onClose={closeSheet}
        entry={sheet.type === "education" ? sheet.entry : null}
        onSave={handleSaveEducation}
      />

      <EditCertificationSheet
        open={sheet.type === "certification"}
        onClose={closeSheet}
        entry={sheet.type === "certification" ? sheet.entry : null}
        onSave={handleSaveCertification}
      />

      <EditProjectSheet
        open={sheet.type === "project"}
        onClose={closeSheet}
        entry={sheet.type === "project" ? sheet.entry : null}
        onSave={handleSaveProject}
      />

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        open={deleteDialog.type !== "none"}
        onClose={() => setDeleteDialog({ type: "none" })}
        onConfirm={handleConfirmDeleteProject}
        itemType={deleteDialog.type === "none" ? undefined : deleteDialog.type}
      />
    </div>
  );
}
