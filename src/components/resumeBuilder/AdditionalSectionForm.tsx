import { motion } from "motion/react";
import { FileText, Briefcase, Zap, Globe, Users, Plus, Check, Lightbulb } from "lucide-react";
import React from "react";

interface AdditionalSectionsFormProps {
    availableSections: any[];
    addedSections: string[];
    onAddSection: (sectionId: string) => void;
}

export const AdditionalSectionsForm: React.FC<AdditionalSectionsFormProps> = ({
    availableSections,
    addedSections,
    onAddSection,
}) => {
    const getIcon = (iconName: string) => {
        const icons: any = {
            FileText,
            Briefcase,
            Zap,
            Globe,
            Users,
            Plus,
        };
        return icons[iconName] || FileText;
    };

    const getSectionColor = (sectionId: string) => {
        const colors: any = {
            courses: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-100",
            internships: "from-orange-500/10 to-amber-500/10 text-orange-600 border-orange-100",
            hobbies: "from-rose-500/10 to-pink-500/10 text-rose-600 border-rose-100",
            languages: "from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-100",
            references: "from-violet-500/10 to-purple-500/10 text-violet-600 border-violet-100",
        };
        return colors[sectionId] || "from-gray-500/10 to-slate-500/10 text-gray-600 border-gray-100";
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Sections</h3>
                <p className="text-xs text-gray-500">Customize your resume with extra relevant information</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableSections.map((section) => {
                    const Icon = getIcon(section.icon);
                    const isAdded = addedSections.includes(section.id);
                    const colorStyles = getSectionColor(section.id);

                    return (
                        <motion.button
                            key={section.id}
                            whileHover={isAdded ? {} : { y: -2 }}
                            whileTap={isAdded ? {} : { y: 0 }}
                            onClick={() => !isAdded && onAddSection(section.id)}
                            disabled={isAdded}
                            className={`group flex items-center gap-3 p-3.5 border-2 rounded-xl transition-all text-left shadow-sm ${isAdded
                                ? "border-green-500 bg-green-50/50 cursor-not-allowed opacity-60"
                                : "border-gray-100 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer"
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0 transition-all ${isAdded ? "from-green-500/10 to-emerald-500/10 text-green-600" : colorStyles
                                    }`}
                            >
                                {isAdded ? (
                                    <Check className="w-5 h-5 animate-in zoom-in duration-300" />
                                ) : (
                                    <Icon className="w-5 h-5" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3
                                    className={`text-xs font-bold transition-colors ${isAdded ? "text-green-700" : "text-gray-900 group-hover:text-blue-600"
                                        }`}
                                >
                                    {section.label}
                                </h3>
                                <p className={`text-[9px] mt-0.5 font-medium uppercase tracking-wider ${isAdded ? "text-green-600" : "text-gray-400"
                                    }`}>
                                    {isAdded ? "Already Added" : "Click to add"}
                                </p>
                            </div>

                            {!isAdded && (
                                <Plus className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex items-start gap-3 shadow-sm"
            >
                <div className="bg-blue-500 text-white p-1 rounded-full shrink-0 shadow-sm">
                    <Lightbulb className="w-3 h-3 fill-current" />
                </div>
                <p className="text-[11px] leading-relaxed text-blue-800">
                    <span className="font-bold underline decoration-blue-200 underline-offset-2 uppercase tracking-tight">Pro Tip:</span>{" "}
                    Add as many sections as you like! You'll be able to fill in all the details for each one in the next steps of the builder.
                </p>
            </motion.div>
        </motion.div>
    );
};
