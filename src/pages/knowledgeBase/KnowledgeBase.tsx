import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, SquarePen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  v2ContainerVariants,
  v2ItemVariants,
  v2PageVariants,
  v2Spring,
} from "@/constants/v2Motion";
import type {
  ReviewProfileData,
  ExperienceEntry,
  EducationEntry,
  CertificationEntry,
  ProjectEntry,
  SkillEntry,
} from "@/types/review";

import ProfessionalSummarySection from "@/components/knowledgeBase/ProfessionalSummarySection";
import ExperienceSection from "@/components/knowledgeBase/ExperienceSection";
import SkillsSection from "@/components/knowledgeBase/SkillsSection";
import EducationSection from "@/components/knowledgeBase/EducationSection";
import CertificationsSection from "@/components/knowledgeBase/CertificationsSection";
import ProjectsSection from "@/components/knowledgeBase/ProjectsSection";

import EditSummarySheet from "@/components/knowledgeBase/EditSummarySheet";
import EditPersonalInfoSheet, {
  type PersonalInfoData,
} from "@/components/knowledgeBase/EditPersonalInfoSheet";
import EditExperienceSheet from "@/components/knowledgeBase/EditExperienceSheet";
import EditEducationSheet from "@/components/knowledgeBase/EditEducationSheet";
import EditCertificationSheet from "@/components/knowledgeBase/EditCertificationSheet";
import EditProjectSheet from "@/components/knowledgeBase/EditProjectSheet";
import AddSkillDialog from "@/components/knowledgeBase/AddSkillDialog";
import DeleteConfirmDialog from "@/components/knowledgeBase/DeleteConfirmDialog";
import ImportDataDialog from "@/components/knowledgeBase/ImportDataDialog";
import ToastProvider from "@/components/knowledgeBase/ToastProvider";
import { useToast } from "@/components/knowledgeBase/useToast";
import {
  useKnowledgeBase,
  useManualUpdateKnowledgeBase,
} from "@/hooks/useKnowledgeBase";
import { authApi } from "@/api";

const EMPTY_PROFILE: ReviewProfileData = {
  summary: { text: "" },
  experience: [],
  skills: [],
  education: [],
  certifications: [],
  projects: [],
};

/** Calculate profile completion as a percentage (6 sections) */
function getProfileCompletion(p: ReviewProfileData): number {
  let filled = 0;
  if (p.summary.text) filled++;
  if (p.experience.length > 0) filled++;
  if (p.skills.length > 0) filled++;
  if (p.education.length > 0) filled++;
  if (p.certifications.length > 0) filled++;
  if (p.projects.length > 0) filled++;
  return Math.round((filled / 6) * 100);
}

type SheetState =
  | { type: "none" }
  | { type: "summary" }
  | { type: "skills" }
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

export default function KnowledgeBase() {
  return (
    <ToastProvider>
      <KnowledgeBaseContent />
    </ToastProvider>
  );
}

function KnowledgeBaseLoading() {
  return (
    <div className="min-h-full px-10 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-gray-200" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />
      </div>

      <div className="grid grid-cols-[20rem_1fr] gap-6">
        <div className="space-y-4">
          <div className="h-44 animate-pulse rounded-2xl bg-white" />
          <div className="h-36 animate-pulse rounded-2xl bg-white" />
        </div>
        <div className="space-y-4">
          <div className="h-52 animate-pulse rounded-2xl bg-white" />
          <div className="h-52 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    </div>
  );
}

function KnowledgeBaseContent() {
  const { toast } = useToast();
  const { data: kbDataResp, isLoading, isFetching } = useKnowledgeBase();
  const { mutateAsync: manualUpdateKnowledgeBase } =
    useManualUpdateKnowledgeBase();
  const kbData = kbDataResp?.data;

  const [profile, setProfile] = useState<ReviewProfileData>(EMPTY_PROFILE);
  const [sheet, setSheet] = useState<SheetState>({ type: "none" });
  const [deleteDialog, setDeleteDialog] = useState<DeleteState>({
    type: "none",
  });
  const [importOpen, setImportOpen] = useState(false);
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    displayName: "",
    role: "",
    country: "",
    state: "",
    website: "",
  });

  useEffect(() => {
    if (kbData) {
      // Map backend data to local state
      const { account, knowledge } = kbData;
      if (account) {
        setPersonalInfo({
          displayName: account.displayName || "",
          role: account.professionalTitle || "",
          country: knowledge?.location?.split(", ")[1] || "",
          state: knowledge?.location?.split(", ")[0] || "",
          website: account.portfolioLink || "",
        });
      }
      if (knowledge) {
        setProfile({
          summary: { text: knowledge.professionalSummary || "" },
          // A bit verbose, but mapping array items accurately depends on backend returned shape. Currently doing a crude fallback mapping:
          experience: (knowledge.experience || []).map((e: any, i) => ({
            id: e.id || String(i),
            title: e.position || "",
            company: e.company || "",
            employmentType: "",
            startMonth: e.startDate
              ? new Date(e.startDate).toLocaleString("default", {
                  month: "long",
                })
              : "",
            startYear: e.startDate
              ? new Date(e.startDate).getFullYear().toString()
              : "",
            endMonth: e.endDate
              ? new Date(e.endDate).toLocaleString("default", { month: "long" })
              : "",
            endYear: e.endDate
              ? new Date(e.endDate).getFullYear().toString()
              : "",
            currentlyWorking: !!e.current,
            location: e.location || "",
            description: e.description || "",
          })),
          education: (knowledge.education || []).map((e: any, i) => ({
            id: e.id || String(i),
            school: e.institution || "",
            degree: e.degree || "",
            fieldOfStudy: e.fieldOfStudy || "",
            startDate: e.startDate || "",
            endDate: e.endDate || "",
            grade: "",
            description: e.description || "",
          })),
          certifications: (knowledge.certifications || []).map((c: any, i) => ({
            id: c.id || String(i),
            name: c.name || "",
            issuingOrganization: c.issuer || "",
            issueMonth: c.issueDate
              ? new Date(c.issueDate).toLocaleString("default", {
                  month: "long",
                })
              : "",
            issueYear: c.issueDate
              ? new Date(c.issueDate).getFullYear().toString()
              : "",
            expirationMonth: "",
            expirationYear: "",
            credentialId: "",
            credentialUrl: "",
          })),
          projects: (knowledge.projects || []).map((p: any, i) => ({
            id: p.id || String(i),
            title: p.title || "",
            description: p.description || "",
            projectLink: p.link || "",
            startMonth: p.startDate
              ? new Date(p.startDate).toLocaleString("default", {
                  month: "long",
                })
              : "",
            startYear: p.startDate
              ? new Date(p.startDate).getFullYear().toString()
              : "",
            endMonth: p.endDate
              ? new Date(p.endDate).toLocaleString("default", { month: "long" })
              : "",
            endYear: p.endDate
              ? new Date(p.endDate).getFullYear().toString()
              : "",
            currentlyWorking: false,
            files: [],
          })),
          skills: (knowledge.skills || []).map((s: any, i) => ({
            id: s.id || String(i),
            name: s.name || s,
          })),
        });
      }
    }
  }, [kbData]);

  const closeSheet = () => setSheet({ type: "none" });

  const toIsoDateFromMonthYear = (month: string, year: string): string => {
    const trimmedYear = year.trim();
    if (!trimmedYear) return "";

    const monthIndex = month
      ? new Date(`${month} 1, 2000`).getMonth()
      : 0;

    const safeMonthIndex = Number.isNaN(monthIndex) ? 0 : monthIndex;
    return `${trimmedYear}-${String(safeMonthIndex + 1).padStart(2, "0")}-01`;
  };

  const normalizeUrl = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  /* ---- CRUD handlers ---- */

  const handleSaveSummary = async (text: string) => {
    try {
      await manualUpdateKnowledgeBase({ professionalSummary: text });
      setProfile(prev => ({ ...prev, summary: { text } }));
      toast("Summary updated successfully!");
    } catch (e) {
      toast("Failed to update summary.", "error");
      throw e;
    }
  };

  const handleSaveExperience = async (entry: ExperienceEntry) => {
    const exists = profile.experience.find(e => e.id === entry.id);
    const nextExperience = exists
      ? profile.experience.map(e => (e.id === entry.id ? entry : e))
      : [...profile.experience, entry];

    const payload = nextExperience.map(e => ({
      company: e.company,
      position: e.title,
      startDate: toIsoDateFromMonthYear(e.startMonth, e.startYear),
      endDate: e.currentlyWorking
        ? ""
        : toIsoDateFromMonthYear(e.endMonth, e.endYear),
      current: e.currentlyWorking,
      description: e.description,
      location: e.location,
    }));

    try {
      await manualUpdateKnowledgeBase({ experience: payload });
      setProfile(prev => ({ ...prev, experience: nextExperience }));
      toast(
        exists
          ? "Experience updated successfully!"
          : "Experience added successfully!"
      );
    } catch (e) {
      toast("Failed to update experience.", "error");
      throw e;
    }
  };

  const handleSaveEducation = async (entry: EducationEntry) => {
    const exists = profile.education.find(e => e.id === entry.id);
    const nextEducation = exists
      ? profile.education.map(e => (e.id === entry.id ? entry : e))
      : [...profile.education, entry];

    const payload = nextEducation.map(e => ({
      institution: e.school,
      degree: e.degree,
      fieldOfStudy: e.fieldOfStudy,
      startDate: e.startDate,
      endDate: e.endDate,
      current: false,
      description: e.description,
    }));

    try {
      await manualUpdateKnowledgeBase({ education: payload });
      setProfile(prev => ({ ...prev, education: nextEducation }));
      toast(
        exists
          ? "Education updated successfully!"
          : "Education added successfully!"
      );
    } catch (e) {
      toast("Failed to update education.", "error");
      throw e;
    }
  };

  const handleSaveCertification = async (entry: CertificationEntry) => {
    const exists = profile.certifications.find(e => e.id === entry.id);
    const nextCertifications = exists
      ? profile.certifications.map(e => (e.id === entry.id ? entry : e))
      : [...profile.certifications, entry];

    const payload = nextCertifications.map(c => ({
      name: c.name,
      issuer: c.issuingOrganization,
      issueDate: toIsoDateFromMonthYear(c.issueMonth, c.issueYear),
    }));

    try {
      await manualUpdateKnowledgeBase({ certifications: payload });
      setProfile(prev => ({ ...prev, certifications: nextCertifications }));
      toast(
        exists
          ? "Certification updated successfully!"
          : "Certification added successfully!"
      );
    } catch (e) {
      toast("Failed to update certification.", "error");
      throw e;
    }
  };

  const handleSaveProject = async (entry: ProjectEntry) => {
    const exists = profile.projects.find(e => e.id === entry.id);
    const nextProjects = exists
      ? profile.projects.map(e => (e.id === entry.id ? entry : e))
      : [...profile.projects, entry];

    const payload = nextProjects.map(p => ({
      title: p.title,
      description: p.description,
      link: normalizeUrl(p.projectLink),
      technologies: [],
      startDate: toIsoDateFromMonthYear(p.startMonth, p.startYear),
      endDate: p.currentlyWorking
        ? ""
        : toIsoDateFromMonthYear(p.endMonth, p.endYear),
    }));

    try {
      await manualUpdateKnowledgeBase({ projects: payload });
      setProfile(prev => ({ ...prev, projects: nextProjects }));
      toast(
        exists ? "Project updated successfully!" : "Project added successfully!"
      );
    } catch (e) {
      toast("Failed to update project.", "error");
      throw e;
    }
  };

  const handleSaveSkills = async (skills: SkillEntry[]) => {
    const payload = skills.map(skill => ({
      name: skill.name,
      level: "Beginner",
    }));

    try {
      await manualUpdateKnowledgeBase({ skills: payload });
      setProfile(prev => ({ ...prev, skills }));
      toast("Skills updated successfully!");
    } catch (e) {
      toast("Failed to update skills.", "error");
      throw e;
    }
  };

  const handleConfirmDeleteItem = async () => {
    try {
      if (deleteDialog.type === "experience") {
        const payload = profile.experience
          .filter(e => e.id !== deleteDialog.entry.id)
          .map(e => ({
            company: e.company,
            position: e.title,
            startDate: toIsoDateFromMonthYear(e.startMonth, e.startYear),
            endDate: e.currentlyWorking
              ? ""
              : toIsoDateFromMonthYear(e.endMonth, e.endYear),
            current: e.currentlyWorking,
            description: e.description,
            location: e.location,
          }));
        await manualUpdateKnowledgeBase({ experience: payload });
        setProfile(prev => ({
          ...prev,
          experience: prev.experience.filter(e => e.id !== deleteDialog.entry.id),
        }));
        toast("Experience deleted successfully!");
      }

      if (deleteDialog.type === "education") {
        const payload = profile.education
          .filter(e => e.id !== deleteDialog.entry.id)
          .map(e => ({
            institution: e.school,
            degree: e.degree,
            fieldOfStudy: e.fieldOfStudy,
            startDate: e.startDate,
            endDate: e.endDate,
            current: false,
            description: e.description,
          }));
        await manualUpdateKnowledgeBase({ education: payload });
        setProfile(prev => ({
          ...prev,
          education: prev.education.filter(e => e.id !== deleteDialog.entry.id),
        }));
        toast("Education deleted successfully!");
      }

      if (deleteDialog.type === "certification") {
        const payload = profile.certifications
          .filter(c => c.id !== deleteDialog.entry.id)
          .map(c => ({
            name: c.name,
            issuer: c.issuingOrganization,
            issueDate: toIsoDateFromMonthYear(c.issueMonth, c.issueYear),
          }));
        await manualUpdateKnowledgeBase({ certifications: payload });
        setProfile(prev => ({
          ...prev,
          certifications: prev.certifications.filter(c => c.id !== deleteDialog.entry.id),
        }));
        toast("Certification deleted successfully!");
      }

      if (deleteDialog.type === "project") {
        const payload = profile.projects
          .filter(p => p.id !== deleteDialog.entry.id)
          .map(p => ({
            title: p.title,
            description: p.description,
            link: normalizeUrl(p.projectLink),
            technologies: [],
            startDate: toIsoDateFromMonthYear(p.startMonth, p.startYear),
            endDate: p.currentlyWorking
              ? ""
              : toIsoDateFromMonthYear(p.endMonth, p.endYear),
          }));
        await manualUpdateKnowledgeBase({ projects: payload });
        setProfile(prev => ({
          ...prev,
          projects: prev.projects.filter(p => p.id !== deleteDialog.entry.id),
        }));
        toast("Project deleted successfully!");
      }

      setDeleteDialog({ type: "none" });
    } catch (e) {
      toast("Failed to delete item.", "error");
      throw e;
    }
  };

  // Avoid rendering placeholder profile data before first backend payload arrives.
  if (isLoading || (isFetching && !kbDataResp)) {
    return <KnowledgeBaseLoading />;
  }

  const selectedLocation = [personalInfo.state, personalInfo.country]
    .filter(Boolean)
    .join(", ");

  const experienceYears = kbData?.knowledge?.experienceYears;
  const experienceText =
    typeof experienceYears === "number" && experienceYears > 0
      ? `${experienceYears} Year${experienceYears === 1 ? "" : "s"}`
      : "";

  const user = {
    displayName: personalInfo.displayName || "User",
    role: personalInfo.role,
    location: selectedLocation,
    experience: experienceText,
    email: kbData?.account?.email || "",
    portfolio: personalInfo.website,
  };
  const initials = (user.displayName || "U")
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const completion = getProfileCompletion(profile);
  const hasDetails =
    user.location || user.experience || user.email || user.portfolio;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={v2PageVariants}
      className="min-h-full"
    >
      {/* Page header */}
      <motion.div
        variants={v2ItemVariants}
        className="flex items-center justify-between  px-10 pt-6"
      >
        <div>
          <h1 className="text-2xl font-medium text-dark">Knowledge Base</h1>
          <p className="text-secondary">
            You can find all your profile data here.
          </p>
        </div>
        <motion.div
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={v2Spring}
        >
          <Button
            className="gap-2 rounded-xl py-2.5 px-4"
            onClick={() => setImportOpen(true)}
          >
            <Download size={16} />
            Import data
          </Button>
        </motion.div>
      </motion.div>

      {/* Body */}
      <motion.div
        variants={v2ContainerVariants}
        className="flex gap-6 px-10 py-6"
      >
        {/* Left — User profile card */}
        <motion.div variants={v2ItemVariants} className="w-[17.5rem] shrink-0">
          <motion.div
            layout
            transition={v2Spring}
            className="sticky top-8 space-y-4 rounded-2xl bg-white shadow-[0_1px_0.5px_0.05px_rgba(29,41,61,0.02)] p-6"
          >
            {/* Edit button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setPersonalInfoOpen(true)}
                className="flex items-center gap-1.5 py-1 px-1.5 text-sm/4 text-secondary hover:text-dark rounded-[0.75rem]"
              >
                <SquarePen className="size-3" />
                Edit
              </Button>
            </div>

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

            {/* Profile completion (always visible) */}
            <div>
              <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                <span>Profile completion</span>
                <span>{completion}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#E5E7EB]">
                <motion.div
                  className="h-2 rounded-full bg-primary transition-all duration-500"
                  transition={v2Spring}
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            {/* Details — shown when user has data */}
            {hasDetails && (
              <div className="space-y-4 text-sm">
                {user.location && (
                  <div>
                    <p className="text-xs text-secondary">Location</p>
                    <p className="text-sm text-secondary flex items-center gap-1.5">
                      {user.location}
                    </p>
                  </div>
                )}

                {user.experience && (
                  <div>
                    <p className="text-xs text-secondary">Experience</p>
                    <p className="text-sm text-secondary flex items-center gap-1.5">
                      {user.experience}
                    </p>
                  </div>
                )}

                <div className="border-t border-[#F3F4F6]" />

                {user.email && (
                  <div>
                    <p className="text-xs text-secondary">Email</p>
                    <p className="text-sm text-secondary break-all flex items-center gap-1.5">
                      {user.email}
                    </p>
                  </div>
                )}

                {user.portfolio && (
                  <div>
                    <p className="text-xs text-secondary">Portfolio</p>
                    <p className="text-sm text-secondary break-all flex items-center gap-1.5">
                      {user.portfolio}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Right — Sections */}
        <motion.div
          variants={v2ContainerVariants}
          className="flex-1 min-w-0 space-y-6"
        >
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
            <SkillsSection
              skills={profile.skills}
              onAdd={() => setSheet({ type: "skills" })}
            />
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

      <AddSkillDialog
        open={sheet.type === "skills"}
        onClose={closeSheet}
        initialSkills={profile.skills}
        onSave={handleSaveSkills}
      />

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        open={deleteDialog.type !== "none"}
        onClose={() => setDeleteDialog({ type: "none" })}
        onConfirm={handleConfirmDeleteItem}
        itemType={deleteDialog.type === "none" ? undefined : deleteDialog.type}
      />

      {/* Personal info sheet */}
      <EditPersonalInfoSheet
        open={personalInfoOpen}
        onClose={() => setPersonalInfoOpen(false)}
        initialData={personalInfo}
        onSave={async data => {
          const location = [data.state, data.country].filter(Boolean).join(", ");
          const website = normalizeUrl(data.website);

          try {
            await Promise.all([
              manualUpdateKnowledgeBase({
                location,
              }),
              authApi.updateProfile({
                professional_title: data.role,
                portfolio_link: website,
              }),
            ]);

            setPersonalInfo({ ...data, website });
            toast("Personal information updated successfully!");
          } catch (e) {
            toast("Failed to update personal information.", "error");
            throw e;
          }
        }}
      />

      {/* Import data dialog */}
      <ImportDataDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={(data: ReviewProfileData) => {
          setProfile(data);
          toast("Profile data imported successfully!");
        }}
      />
    </motion.div>
  );
}
