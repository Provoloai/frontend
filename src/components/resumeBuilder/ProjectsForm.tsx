import {
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import {
  Trash2,
  FolderGit2,
  Calendar,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Lightbulb,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useDragControls,
} from "motion/react";
import React, { useState } from "react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";
import { Resume, Project } from "@/types";

interface ProjectsFormProps {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  setValue: UseFormSetValue<Resume>;
}

interface ProjectItemProps {
  project: Project;
  index: number;
  control: Control<Resume>;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: (id: string) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  index,
  control,
  isExpanded,
  onToggle,
  onRemove,
}) => {
  const controls = useDragControls();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Reorder.Item
      value={project}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="relative group"
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={`border-2 rounded-xl transition-all duration-200 overflow-hidden ${
          isExpanded
            ? "border-blue-300 bg-white shadow-md text-gray-900"
            : "border-gray-200 bg-gray-50 hover:border-gray-300"
        }`}
      >
        {/* Accordion Header */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer select-none"
          onClick={onToggle}
        >
          <div className="flex items-center gap-3 pr-8">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isExpanded ? "bg-green-100" : "bg-gray-200"
              }`}
            >
              <FolderGit2
                className={`w-4 h-4 ${isExpanded ? "text-green-600" : "text-gray-500"}`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                {project.title || "Project Title"}
              </span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {project.technologies?.join(", ") || "Technologies"}
              </span>
            </div>
          </div>
          <div className="flex items-center shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Accordion Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-5 pb-5 pt-2 space-y-4 border-t border-gray-100">
                {/* Project Title */}
                <Controller
                  name={`content.projects.${index}.title`}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <TextInputField
                      {...field}
                      id={`project-title-${index}`}
                      label="Project Title"
                      placeholder="e.g. E-commerce Platform"
                      iconStart={
                        <FolderGit2 className="w-4 h-4 text-gray-400" />
                      }
                    />
                  )}
                />

                {/* Project Link */}
                <Controller
                  name={`content.projects.${index}.link`}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <TextInputField
                      {...field}
                      id={`project-link-${index}`}
                      label="Project Link (Optional)"
                      placeholder="https://github.com/username/project"
                      iconStart={<LinkIcon className="w-4 h-4 text-gray-400" />}
                    />
                  )}
                />

                {/* Technologies */}
                <Controller
                  name={`content.projects.${index}.technologies`}
                  control={control}
                  render={({ field }: { field: any }) => (
                    <TextInputField
                      {...field}
                      value={
                        Array.isArray(field.value)
                          ? field.value.join(", ")
                          : field.value
                      }
                      onChange={e => {
                        const value = e.target.value;
                        field.onChange(
                          value
                            ? value.split(",").map((t: string) => t.trim())
                            : []
                        );
                      }}
                      id={`project-tech-${index}`}
                      label="Technologies Used"
                      placeholder="React, Node.js, MongoDB (comma-separated)"
                      iconStart={
                        <FolderGit2 className="w-4 h-4 text-gray-400" />
                      }
                    />
                  )}
                />

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`content.projects.${index}.startDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`project-startDate-${index}`}
                        label="Start Date"
                        type="date"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`content.projects.${index}.endDate`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <TextInputField
                        {...field}
                        id={`project-endDate-${index}`}
                        label="End Date (Optional)"
                        type="date"
                        iconStart={
                          <Calendar className="w-4 h-4 text-gray-400" />
                        }
                      />
                    )}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Controller
                    name={`content.projects.${index}.description`}
                    control={control}
                    render={({
                      field,
                      fieldState,
                    }: {
                      field: any;
                      fieldState: any;
                    }) => (
                      <TextInputField
                        {...field}
                        id={`project-desc-${index}`}
                        label="Description"
                        variant="rich-text"
                        placeholder="• Built a full-stack application&#10;• Implemented key features&#10;• Achieved measurable results"
                        helperText="Describe the project and your contributions"
                        touched={fieldState.isTouched}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Drag Handle */}
      <div
        className={`absolute -left-2 -top-2 p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full shadow-md transition-all duration-300 z-10 cursor-grab active:cursor-grabbing ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
        title="Drag to reorder"
        onPointerDown={e => controls.start(e)}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Floating Trash Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onRemove(project.id!);
        }}
        className={`absolute -right-2 -top-2 p-1.5 bg-white border border-gray-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full shadow-md transition-all duration-300 z-10 ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
        title="Remove Project"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </Reorder.Item>
  );
};

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const projects = watch("content.projects") || [];
  const [expandedId, setExpandedId] = useState<string | null>(
    projects[0]?.id || null
  );

  const addProject = () => {
    const newId = Date.now().toString();
    const newProject: Project = {
      id: newId,
      title: "",
      description: "",
      link: "",
      technologies: [],
      startDate: "",
      endDate: "",
    };
    setValue("content.projects", [newProject, ...projects]);
    setExpandedId(newId);
  };

  const removeProject = (id: string) => {
    setValue(
      "content.projects",
      projects.filter(project => project.id !== id)
    );
    if (expandedId === id) setExpandedId(null);
  };

  const handleReorder = (newOrder: Project[]) => {
    setValue("content.projects", newOrder, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Projects</h3>
          <p className="text-xs text-gray-600 mt-1">
            Showcase your portfolio and side projects
          </p>
        </div>

        <div className="w-fit flex justify-end">
          <CustomButton onClick={addProject} className="btn-primary">
            Add Project
          </CustomButton>
        </div>
      </div>

      {/* Projects List */}
      <Reorder.Group
        axis="y"
        values={projects}
        onReorder={handleReorder}
        className="space-y-4 px-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project: Project, index: number) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              control={control}
              isExpanded={expandedId === project.id}
              onToggle={() => toggleExpand(project.id || "")}
              onRemove={removeProject}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
        >
          <FolderGit2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-1">No projects added yet</p>
          <p className="text-xs text-gray-500">
            Click "Add Project" to get started
          </p>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white p-1 rounded-full shrink-0 shadow-sm">
            <Lightbulb className="w-3 h-3 fill-current" />
          </div>
          <span className="text-[11px] font-bold text-blue-900 underline decoration-blue-200 underline-offset-2 uppercase tracking-tight">
            Pro Tips
          </span>
        </div>

        <div className="space-y-2 px-1">
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Include **live links** or GitHub repositories to showcase your
              work
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Highlight **measurable outcomes** (e.g., "increased performance by
              40%")
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              List the **technologies used** to demonstrate technical breadth
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
