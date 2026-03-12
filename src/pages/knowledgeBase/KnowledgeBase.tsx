import { useState } from "react";
import { Download } from "lucide-react";
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

import ProfessionalSummarySection from "@/components/knowledgeBase/ProfessionalSummarySection";
import ExperienceSection from "@/components/knowledgeBase/ExperienceSection";
import SkillsSection from "@/components/knowledgeBase/SkillsSection";
import EducationSection from "@/components/knowledgeBase/EducationSection";
import CertificationsSection from "@/components/knowledgeBase/CertificationsSection";
import ProjectsSection from "@/components/knowledgeBase/ProjectsSection";

import EditSummarySheet from "@/components/knowledgeBase/EditSummarySheet";
import EditExperienceSheet from "@/components/knowledgeBase/EditExperienceSheet";
import EditEducationSheet from "@/components/knowledgeBase/EditEducationSheet";
import EditCertificationSheet from "@/components/knowledgeBase/EditCertificationSheet";
import EditProjectSheet from "@/components/knowledgeBase/EditProjectSheet";
import DeleteConfirmDialog from "@/components/knowledgeBase/DeleteConfirmDialog";
import ToastProvider from "@/components/knowledgeBase/ToastProvider";
import { useToast } from "@/components/knowledgeBase/useToast";

const PLACEHOLDER_USER = {
  displayName: "Shakirat Akanji",
  role: "Design Engineer / UX Designer",
  location: "Lagos, Nigeria",
  experience: "3 Years",
  email: "akanjiishakirat@gmail.com",
  portfolio: "sakunli.framer.website",
};

type SheetState =
  | { type: "none" }
  | { type: "summary" }
  | { type: "experience"; entry: ExperienceEntry | null }
  | { type: "education"; entry: EducationEntry | null }
  | { type: "certification"; entry: CertificationEntry | null }
  | { type: "project"; entry: ProjectEntry | null };

type DeleteState = { type: "none" } | { type: "project"; entry: ProjectEntry };

export default function KnowledgeBase() {
  return (
    <ToastProvider>
      <KnowledgeBaseContent />
    </ToastProvider>
  );
}

function KnowledgeBaseContent() {
  const { toast } = useToast();
  const [profile, setProfile] =
    useState<ReviewProfileData>(PLACEHOLDER_PROFILE);
  const [sheet, setSheet] = useState<SheetState>({ type: "none" });
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    type: "none",
  });

  const closeSheet = () => setSheet({ type: "none" });

  /* ---- CRUD handlers ---- */

  const handleSaveSummary = (text: string) => {
    setProfile(prev => ({ ...prev, summary: { text } }));
    toast("Summary updated successfully!");
  };

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

  const user = PLACEHOLDER_USER;
  const initials = user.displayName
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-full">
      {/* Page header */}
      <div className="flex items-center justify-between  px-10 pt-6">
        <div>
          <h1 className="text-2xl font-medium text-dark">Knowledge Base</h1>
          <p className="text-secondary">
            You can find all your profile data here.
          </p>
        </div>
        <Button className="gap-2 rounded-xl py-2.5 px-4">
          <Download size={16} />
          Import data
        </Button>
      </div>

      {/* Body */}
      <div className="flex gap-6 px-10 py-6">
        {/* Left — User profile card */}
        <div className="w-[17.5rem] shrink-0">
          <div className="sticky top-8 space-y-4 rounded-2xl bg-white shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02) p-6">
            {/* Avatar + name */}
            <div>
              <Avatar className="size-20 mb-3">
                <AvatarFallback className="bg-primary text-xl font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold text-dark">
                {user.displayName}
              </h2>
              <p className="text-sm text-secondary pb-4 border-b border-[#f3f4f6]">
                {user.role}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs  text-secondary ">Location</p>
                <p className="text-sm text-secondary">{user.location}</p>
              </div>

              <div>
                <p className="text-xs  text-secondary ">Experience</p>
                <p className="text-sm text-secondary">{user.experience}</p>
              </div>
              <div className="border-t border-[#F3F4F6] h-[1px]" />
              <div>
                <p className="text-xs  text-secondary ">Email</p>
                <p className="text-sm text-secondary break-all">{user.email}</p>
              </div>

              <div>
                <p className="text-xs  text-secondary ">Portfolio</p>
                <p className="text-sm text-secondary break-all">
                  {user.portfolio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Sections */}
        <div className="flex-1 min-w-0 space-y-6">
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
