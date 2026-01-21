import { Heart, Lightbulb, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useMemo } from "react";

const SUGGESTED_HOBBIES = [
  // Tech & Development
  "Open Source Contributing", "Hackathons", "System Design", "Cloud Computing", "Technical Writing", "Cybersecurity", "Ethics in AI", "Blockchain Technology",
  "Raspberry Pi Tinkering", "Mobile App Development", "Game Dev Projects", "Algorithm Challenges", "Competitive Coding", "Frontend Architecture",
  // UI/UX & Creative Tech
  "User Research", "Wireframing", "Typography", "Color Theory", "Motion Design", "3D Modeling", "Prototyping", "Design Systems",
  "Accessibility Advocacy", "Brand Identity", "Photography", "Digital Illustration", "UI Animation", "Interaction Design",
  // Professional & Non-Technical
  "Public Speaking", "Mentoring", "Product Management", "Data Analytics", "Stock Market Analysis", "Personal Finance", "Strategic Planning",
  "Project Management", "Agile Methodologies", "Networking Events", "Community Organizing", "Soft Skills Training", "Content Strategy",
  // Sports & Fitness
  "Basketball", "Soccer", "Volleyball", "Running", "Yoga", "Swimming", "Cycling", "Tennis", "Golf", "Martial Arts",
  "Rock Climbing", "Hiking", "Gym Training", "Pilates", "CrossFit", "Surfing", "Skiing", "Badminton", "Cricket", "Rugby",
  // Creative Arts
  "Painting", "Drawing", "Sketching", "Pottery", "Knitting", "Crocheting", "Sewing", "Embroidery", "Calligraphy",
  "Graphic Design", "Digital Art", "Origami", "Scrapbooking", "Woodworking", "Sculpture", "Interior Design", "Fashion Design",
  // Games & Strategy
  "Chess", "Board Games", "Video Games", "Competitive Gaming", "Card Games", "Poker", "Billiards", "Darts", "Magic Tricks", "Tabletop RPGs",
  // Languages & Learning
  "Learning Languages", "Reading", "Writing", "Blogging", "Journaling", "History", "Philosophy", "Astronomy", "Science Experiments",
  "Debate", "Podcasts", "Documentaries",
  // Social & Community
  "Volunteering", "Mentoring", "Tutoring", "Community Service", "Event Planning", "Networking", "Wine Tasting", "Cooking", "Baking", "Mixology",
  // Outdoors & Travel
  "Traveling", "Backpacking", "Camping", "Fishing", "Gardening", "Bird Watching", "Urban Exploration", "Road Trips", "Sailing", "Scuba Diving", "Snorkeling",
  // Music & Performing Arts
  "Playing Guitar", "Playing Piano", "Playing Drums", "Singing", "Songwriting", "Music Production", "Dancing", "Acting", "Improv", "Stand-up Comedy", "Theater"
];

interface HobbiesFormProps {
  watch: any;
  setValue: any;
}

export const HobbiesForm: React.FC<HobbiesFormProps> = ({ watch, setValue }) => {
  const hobbies = watch('hobbies') || [];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHobbies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const suggestions = SUGGESTED_HOBBIES.filter(hobby =>
      hobby.toLowerCase().includes(query)
    );

    // If query is not empty and doesn't match any suggestion exactly,
    // show it as a custom option at the beginning
    const exactMatch = SUGGESTED_HOBBIES.find(h => h.toLowerCase() === query);
    if (query && !exactMatch) {
      return [searchQuery.trim(), ...suggestions];
    }

    return suggestions;
  }, [searchQuery]);

  const addHobby = (name: string) => {
    if (!name.trim()) return;

    // Check if limit reached
    if (hobbies.length >= 10) {
      setSearchQuery("");
      return;
    }

    const newId = Date.now().toString();
    const newHobby = {
      id: newId,
      name: name.trim(),
      description: '',
    };

    // Check if hobby already exists
    if (hobbies.some((h: any) => h.name.toLowerCase() === name.trim().toLowerCase())) {
      setSearchQuery(""); // Clear search if already exists
      return;
    }

    setValue('hobbies', [...hobbies, newHobby]);
    setSearchQuery("");
  };

  const removeHobby = (id: string) => {
    setValue('hobbies', hobbies.filter((hobby: any) => hobby.id !== id));
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
        <h3 className="text-base font-semibold text-gray-900">Hobbies & Interests</h3>
        <p className="text-xs text-gray-600 mt-1">Select up to 10 interests that highlight your personality and skills</p>
      </div>

      {/* Search Section */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            disabled={hobbies.length >= 10}
            placeholder={hobbies.length >= 10 ? "Limit of 10 hobbies reached" : "Search or add custom hobby..."}
            className={`w-full pl-10 pr-4 py-2 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm ${hobbies.length >= 10 ? "bg-gray-50 border-gray-200 cursor-not-allowed italic" : "border-gray-200"
              }`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                addHobby(searchQuery);
              }
            }}
          />
          {hobbies.length >= 10 && (
            <div className="mt-2 text-[10px] text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 w-fit">
              Maximum of 10 hobbies allowed. Remove one to add a new one.
            </div>
          )}
        </div>

        <div className="max-h-60 overflow-y-auto p-1 no-scrollbar">
          <div className="flex flex-wrap gap-2">
            {filteredHobbies.slice(0, 50).map((hobbyName, idx) => {
              const isSelected = hobbies.some((h: any) => h.name.toLowerCase() === hobbyName.toLowerCase());
              const isCustom = searchQuery.trim() && !SUGGESTED_HOBBIES.some(h => h.toLowerCase() === hobbyName.toLowerCase());

              return (
                <button
                  key={`${hobbyName}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      const hobbyToRemove = hobbies.find((h: any) => h.name.toLowerCase() === hobbyName.toLowerCase());
                      if (hobbyToRemove) removeHobby(hobbyToRemove.id);
                    } else {
                      addHobby(hobbyName);
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
                  {hobbyName}
                  {isSelected && <X className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Hobbies Summary */}
      <div className="space-y-4">
        {hobbies.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Selected ({hobbies.length})</span>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {hobbies.map((hobby: any) => (
              <motion.div
                key={hobby.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all cursor-pointer shadow-sm"
                onClick={() => removeHobby(hobby.id)}
                title="Click to remove"
              >
                <span className="text-xs font-semibold">{hobby.name}</span>
                <X className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Empty State */}
      {hobbies.length === 0 && searchQuery === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200"
        >
          <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">Choose from suggested hobbies</p>
          <p className="text-xs text-gray-500 mt-1">Or search to add your own special interests</p>
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
              Choose hobbies that demonstrate **soft skills** like teamwork or leadership
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Avoid generic hobbies; be as **specific** as possible to stand out
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Only include personal interests if they add value to your professional image
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};