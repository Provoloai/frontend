import { Heart, Lightbulb, Search, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useMemo } from "react";

const SUGGESTED_SKILLS = [
  // Programming & Engineering
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby",
  "React", "Vue.js", "Angular", "Next.js", "Node.js", "Express", "Django", "Flask", "Spring Boot", "Laravel",
  "Microservices", "Serverless Architecture", "CLEAN Code", "TDD", "System Design", "API Development",
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud (GCP)", "Docker", "Kubernetes", "CI/CD", "Git", "Terraform", "Ansible",
  "Monitoring & Alerting", "Linux Server Administration", "Cybersecurity", "Network Security",
  // Data & AI
  "SQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Machine Learning", "Artificial Intelligence",
  "Deep Learning", "Natural Language Processing (NLP)", "Large Language Models (LLMs)", "Data Engineering",
  // Design & UI/UX
  "Figma", "Adobe Creative Suite", "Design Systems", "User Research", "Wireframing", "Prototyping",
  "Information Architecture", "Visual Design", "Accessibility (A11y)", "Interaction Design",
  // Business & Product
  "Product Management", "Strategic Planning", "Market Research", "Product Roadmap", "Growth Hacking",
  "Business Analysis", "Stakeholder Management", "Project Management", "Agile Methodologies", "Scrum",
  // Marketing & Growth
  "SEO", "SEM", "Content Strategy", "Digital Marketing", "CRM", "Salesforce", "Google Analytics", "Data Visualization",
  // Core Professional
  "Leadership", "Team Management", "Communication", "Problem Solving", "Critical Thinking", "Adaptability",
  "Time Management", "Conflict Resolution", "Public Speaking", "Technical Writing", "Creative Direction"
];

interface SkillsFormProps {
  watch: any;
  setValue: any;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ watch, setValue }) => {
  const skills = watch('skills') || [];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const suggestions = SUGGESTED_SKILLS.filter(skill =>
      skill.toLowerCase().includes(query)
    );

    // If query is not empty and doesn't exactly match any suggestion,
    // add it as a custom option at the beginning
    const exactMatch = SUGGESTED_SKILLS.find(s => s.toLowerCase() === query);
    if (query && !exactMatch) {
      return [searchQuery.trim(), ...suggestions];
    }

    return suggestions;
  }, [searchQuery]);

  const addSkill = (name: string) => {
    if (!name.trim()) return;

    // Check if limit reached
    if (skills.length >= 10) {
      setSearchQuery("");
      return;
    }

    const newId = Date.now().toString();
    const newSkill = {
      id: newId,
      name: name.trim(),
      level: 3, // Default level for compatibility
    };

    // Check if skill already exists
    if (skills.some((s: any) => s.name.toLowerCase() === name.trim().toLowerCase())) {
      setSearchQuery("");
      return;
    }

    setValue('skills', [...skills, newSkill]);
    setSearchQuery("");
  };

  const removeSkill = (id: string) => {
    setValue('skills', skills.filter((skill: any) => skill.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-gray-900">Skills & Expertise</h3>
        <p className="text-xs text-gray-600 mt-1">Select up to 10 skills that highlight your professional expertise</p>
      </div>

      {/* Search Section */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-[11px] w-4 h-4 text-gray-400" />
          <input
            type="text"
            disabled={skills.length >= 10}
            placeholder={skills.length >= 10 ? "Limit of 10 skills reached" : "Search or add custom skill..."}
            className={`w-full pl-10 pr-4 py-2 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors shadow-sm ${skills.length >= 10 ? "bg-gray-50 border-gray-200 cursor-not-allowed" : "border-gray-200"
              }`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                addSkill(searchQuery);
              }
            }}
          />
        </div>

        {/* Warning Message Container with fixed height to prevent wobble */}
        <div className="h-6 mt-1">
          <AnimatePresence>
            {skills.length >= 10 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 w-fit"
              >
                Maximum of 10 skills allowed. Remove one to add a new one.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="max-h-60 overflow-y-auto p-1 no-scrollbar">
          <div className="flex flex-wrap gap-2">
            {filteredSkills.slice(0, 50).map((skillName, idx) => {
              const isSelected = skills.some((s: any) => s.name.toLowerCase() === skillName.toLowerCase());
              const isCustom = searchQuery.trim() && !SUGGESTED_SKILLS.some(s => s.toLowerCase() === skillName.toLowerCase());

              return (
                <button
                  key={`${skillName}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      const skillToRemove = skills.find((s: any) => s.name.toLowerCase() === skillName.toLowerCase());
                      if (skillToRemove) removeSkill(skillToRemove.id);
                    } else {
                      addSkill(skillName);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${isSelected
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : isCustom
                      ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                      : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                >
                  {isCustom && !isSelected && <span className="text-[10px] uppercase font-bold text-amber-500">Add New:</span>}
                  {skillName}
                  {isSelected && <X className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Skills Summary */}
      <div className="space-y-4">
        {skills.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Selected ({skills.length})</span>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {skills.map((skill: any) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all cursor-pointer shadow-sm"
                onClick={() => removeSkill(skill.id)}
                title="Click to remove"
              >
                <span className="text-xs font-semibold">{skill.name}</span>
                <X className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Empty State */}
      {skills.length === 0 && searchQuery === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200"
        >
          <Zap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">Choose from suggested skills</p>
          <p className="text-xs text-gray-500 mt-1">Or search to add your own special expertise</p>
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
          <span className="text-[11px] font-bold text-blue-900 underline decoration-blue-200 underline-offset-2 uppercase tracking-tight">Pro Tips</span>
        </div>

        <div className="space-y-2 px-1">
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Include both **technical** and **soft skills** to show a well-rounded profile
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Focus on skills most **relevant** to the target role to stand out
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              List specific tools and frameworks you've mastered to show **practical depth**
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsForm;