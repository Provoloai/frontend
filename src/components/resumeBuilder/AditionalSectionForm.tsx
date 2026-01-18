import { motion } from "motion/react";
import { FileText, Briefcase, Zap, Globe, Users, Plus, Check } from "lucide-react";

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

  return (
    <motion.div 
      className="space-y-6" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Additional Sections</h3>
        <p className="text-sm text-gray-600">Select sections to add to your resume</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {availableSections.map((section) => {
          const Icon = getIcon(section.icon);
          const isAdded = addedSections.includes(section.id);
          
          return (
            <motion.button
              key={section.id}
              whileHover={{ scale: isAdded ? 1 : 1.02 }}
              whileTap={{ scale: isAdded ? 1 : 0.98 }}
              onClick={() => !isAdded && onAddSection(section.id)}
              disabled={isAdded}
              className={`flex items-start gap-4 p-4 border-2 rounded-xl transition-all text-left ${
                isAdded
                  ? 'border-green-500 bg-green-50 cursor-not-allowed'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isAdded ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Icon className={`w-5 h-5 ${isAdded ? 'text-green-600' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900">{section.label}</h3>
                {isAdded && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Added
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">Tip:</span> You can add these sections and fill them out in the review step
        </p>
      </div>
    </motion.div>
  );
};