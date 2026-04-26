import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  v2ContainerVariants,
  v2ItemVariants,
  v2PageVariants,
  v2Spring,
} from "@/constants/v2Motion";
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
import { useManualUpdateKnowledgeBase } from "@/hooks/useKnowledgeBase";

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

type DeleteState =
  | { type: "none" }
  | { type: "experience"; entry: ExperienceEntry }
  | { type: "education"; entry: EducationEntry }
  | { type: "certification"; entry: CertificationEntry }
  | { type: "project"; entry: ProjectEntry };

export default function OnboardingReview() {
  return (
    <ToastProvider>
      <OnboardingReviewContent />
    </ToastProvider>
  );
}

function OnboardingReviewContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: manualUpdateKnowledgeBase } = useManualUpdateKnowledgeBase();
  const [profile, setProfile] =
    useState<ReviewProfileData>(PLACEHOLDER_PROFILE);
  const [sheet, setSheet] = useState<SheetState>({ type: "none" });
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    type: "none",
  });
  const [isSaving, setIsSaving] = useState(false);

  const closeSheet = () => setSheet({ type: "none" });

  const toIsoDateFromMonthYear = (month: string, year: string): string => {
    const trimmedYear = year.trim();
    if (!trimmedYear) return "";
    const monthIndex = month ? new Date(`${month} 1, 2000`).getMonth() : 0;
    const safeMonthIndex = Number.isNaN(monthIndex) ? 0 : monthIndex;
    return `${trimmedYear}-${String(safeMonthIndex + 1).padStart(2, "0")}-01`;
  };

  const normalizeUrl = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

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

  const handleConfirmDeleteItem = () => {
    if (deleteDialog.type === "experience") {
      setProfile(prev => ({
        ...prev,
        experience: prev.experience.filter(e => e.id !== deleteDialog.entry.id),
      }));
      toast("Experience deleted successfully!");
    }

    if (deleteDialog.type === "education") {
      setProfile(prev => ({
        ...prev,
        education: prev.education.filter(e => e.id !== deleteDialog.entry.id),
      }));
      toast("Education deleted successfully!");
    }

    if (deleteDialog.type === "certification") {
      setProfile(prev => ({
        ...prev,
        certifications: prev.certifications.filter(
          c => c.id !== deleteDialog.entry.id
        ),
      }));
      toast("Certification deleted successfully!");
    }

    if (deleteDialog.type === "project") {
      setProfile(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== deleteDialog.entry.id),
      }));
      toast("Project deleted successfully!");
    }
    setDeleteDialog({ type: "none" });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const payload = {
        professionalSummary: profile.summary.text,
        experience: profile.experience.map(e => ({
          company: e.company,
          position: e.title,
          startDate: toIsoDateFromMonthYear(e.startMonth, e.startYear),
          endDate: e.currentlyWorking ? "" : toIsoDateFromMonthYear(e.endMonth, e.endYear),
          current: e.currentlyWorking,
          description: e.description,
          location: e.location,
        })),
        education: profile.education.map(e => ({
          institution: e.school,
          degree: e.degree,
          fieldOfStudy: e.fieldOfStudy,
          startDate: e.startDate,
          endDate: e.endDate,
          current: false,
          description: e.description,
        })),
        certifications: profile.certifications.map(c => ({
          name: c.name,
          issuer: c.issuingOrganization,
          issueDate: toIsoDateFromMonthYear(c.issueMonth, c.issueYear),
        })),
        projects: profile.projects.map(p => ({
          title: p.title,
          description: p.description,
          link: normalizeUrl(p.projectLink),
          technologies: [],
          startDate: toIsoDateFromMonthYear(p.startMonth, p.startYear),
          endDate: p.currentlyWorking ? "" : toIsoDateFromMonthYear(p.endMonth, p.endYear),
        })),
        skills: profile.skills.map(s => ({
          name: s.name,
          level: "Beginner"
        }))
      };

      await manualUpdateKnowledgeBase(payload);
      toast("Profile saved successfully!");
      router.navigate({ to: "/knowledge-base" });
    } catch (error) {
      toast("Failed to save profile.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const { displayName, email } = PLACEHOLDER_USER;
  const initials = displayName
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={v2PageVariants}
      className="flex min-h-dvh flex-col bg-[#F3F4F6]"
    >
      {/* Header */}
      <motion.header
        variants={v2ItemVariants}
        className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 mobile:px-4"
      >
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
      </motion.header>

      {/* Content */}
      <motion.main
        variants={v2ContainerVariants}
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 mobile:px-4 mobile:py-6"
      >
        <motion.h1
          variants={v2ItemVariants}
          className="mb-6 text-2xl font-semibold text-dark"
        >
          Review Profile Information
        </motion.h1>

        <motion.div variants={v2ContainerVariants} className="space-y-6">
          <motion.div layout variants={v2ItemVariants} transition={v2Spring}>
            <ProfessionalSummarySection
              summary={profile.summary}
              onEdit={() => setSheet({ type: "summary" })}
            />
          </motion.div>

          <motion.div layout variants={v2ItemVariants} transition={v2Spring}>
            <ExperienceSection
              entries={profile.experience}
              onAdd={() => setSheet({ type: "experience", entry: null })}
              onEdit={entry => setSheet({ type: "experience", entry })}
              onDelete={entry => setDeleteDialog({ type: "experience", entry })}
            />
          </motion.div>

          <motion.div layout variants={v2ItemVariants} transition={v2Spring}>
            <SkillsSection skills={profile.skills} />
          </motion.div>

          <motion.div layout variants={v2ItemVariants} transition={v2Spring}>
            <EducationSection
              entries={profile.education}
              onAdd={() => setSheet({ type: "education", entry: null })}
              onEdit={entry => setSheet({ type: "education", entry })}
              onDelete={entry => setDeleteDialog({ type: "education", entry })}
            />
          </motion.div>

          <motion.div layout variants={v2ItemVariants} transition={v2Spring}>
            <CertificationsSection
              entries={profile.certifications}
              onAdd={() => setSheet({ type: "certification", entry: null })}
              onEdit={entry => setSheet({ type: "certification", entry })}
              onDelete={entry =>
                setDeleteDialog({ type: "certification", entry })
              }
            />
          </motion.div>

          <motion.div layout variants={v2ItemVariants} transition={v2Spring}>
            <ProjectsSection
              entries={profile.projects}
              onAdd={() => setSheet({ type: "project", entry: null })}
              onEdit={entry => setSheet({ type: "project", entry })}
              onDelete={entry => setDeleteDialog({ type: "project", entry })}
            />
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Bottom bar */}
      <motion.div
        variants={v2ItemVariants}
        className="sticky bottom-0 border-t border-gray-200 bg-white px-8 py-4 mobile:px-4"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/knowledge-base">
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={v2Spring}
            >
              <Button
                variant="outline"
                className="py-2.5 px-4 rounded-xl bg-[#f9fafb]"
              >
                Skip
              </Button>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={v2Spring}
          >
            <Button
              className="py-2.5 px-4 rounded-xl flex items-center gap-2"
              onClick={handleSaveAll}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="size-4 animate-spin" />}
              Save
            </Button>
          </motion.div>
        </div>
      </motion.div>

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
        onConfirm={handleConfirmDeleteItem}
        itemType={deleteDialog.type === "none" ? undefined : deleteDialog.type}
      />
    </motion.div>
  );
}
