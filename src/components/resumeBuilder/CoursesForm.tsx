import { Controller } from "react-hook-form";
import { Trash2, BookOpen, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CustomButton from "@/Reusables/CustomButton";
import TextInputField from "@/Reusables/TextInputField";

interface CoursesFormProps {
  control: any;
  watch: any;
  setValue: any;
}

export const CoursesForm: React.FC<CoursesFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const courses = watch("courses") || [];

  const addCourse = () => {
    setValue("courses", [
      ...courses,
      {
        id: Date.now().toString(),
        name: "",
        institution: "",
        completionDate: "",
        description: "",
      },
    ]);
  };

  const removeCourse = (id: string) => {
    setValue(
      "courses",
      courses.filter((course: any) => course.id !== id)
    );
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Courses & Certifications
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Add relevant courses and certifications
          </p>
        </div>
        <div className="w-fit flex justify-end">
          <CustomButton onClick={addCourse} className="btn-primary">
            {/* <Plus className="w-4 h-4" /> */}
            Add Course
          </CustomButton>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {courses.map((course: any, index: number) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Course {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeCourse(course.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Controller
              name={`courses.${index}.name`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`course-name-${index}`}
                  label="Course Name"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  iconStart={<BookOpen className="w-4 h-4 text-gray-400" />}
                />
              )}
            />

            <Controller
              name={`courses.${index}.institution`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`course-institution-${index}`}
                  label="Institution/Platform"
                  placeholder="e.g. Coursera, Udemy, AWS"
                  iconStart={<BookOpen className="w-4 h-4 text-gray-400" />}
                />
              )}
            />

            <Controller
              name={`courses.${index}.completionDate`}
              control={control}
              render={({ field }) => (
                <TextInputField
                  {...field}
                  id={`course-date-${index}`}
                  label="Completion Date"
                  type="date"
                  iconStart={<Calendar className="w-4 h-4 text-gray-400" />}
                />
              )}
            />

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Description (Optional)
              </label>
              <Controller
                name={`courses.${index}.description`}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Key learnings or skills gained..."
                    rows={3}
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {courses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">No courses added yet</p>
        </div>
      )}
    </motion.div>
  );
};
