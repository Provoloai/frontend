import { Controller, Control } from "react-hook-form";
import { User, Mail, Phone, MapPin, Briefcase, Linkedin, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import TextInputField from "@/Reusables/TextInputField";
import { ResumeData } from "@/stores/resumeStore";

interface PersonalInfoFormProps {
  control: Control<ResumeData>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ control }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="personalInfo.firstName"
            control={control}
            render={({ field }) => (
              <TextInputField
                {...field}
                id="firstName"
                label=""
                placeholder="First Name"
                iconStart={<User className="w-4 h-4 text-gray-400" />}
              />
            )}
          />
          <Controller
            name="personalInfo.lastName"
            control={control}
            render={({ field }) => (
              <TextInputField
                {...field}
                id="lastName"
                label=""
                placeholder="Last Name"
                iconStart={<User className="w-4 h-4 text-gray-400" />}
              />
            )}
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Controller
          name="personalInfo.jobTitle"
          control={control}
          render={({ field }) => (
            <TextInputField
              {...field}
              id="jobTitle"
              label="Professional Title"
              placeholder="e.g. Software Engineer, Marketing Manager"
              iconStart={<Briefcase className="w-4 h-4 text-gray-400" />}
              required
            />
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
          Contact Information
        </h3>

        <Controller
          name="personalInfo.email"
          control={control}
          render={({ field }) => (
            <TextInputField
              {...field}
              id="email"
              label=""
              type="email"
              placeholder="Email Address"
              iconStart={<Mail className="w-4 h-4 text-gray-400" />}
            />
          )}
        />

        <Controller
          name="personalInfo.phone"
          control={control}
          render={({ field }) => (
            <TextInputField
              {...field}
              id="phone"
              label=""
              placeholder="Phone Number"
              iconStart={<Phone className="w-4 h-4 text-gray-400" />}
            />
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
          Location
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="personalInfo.city"
            control={control}
            render={({ field }) => (
              <TextInputField
                {...field}
                id="city"
                label=""
                placeholder="City"
                iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
              />
            )}
          />
          <Controller
            name="personalInfo.country"
            control={control}
            render={({ field }) => (
              <TextInputField
                {...field}
                id="country"
                label=""
                placeholder="Country"
                iconStart={<MapPin className="w-4 h-4 text-gray-400" />}
              />
            )}
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
          Professional Links
        </h3>

        <Controller
          name="personalInfo.linkedinUrl"
          control={control}
          render={({ field }) => (
            <TextInputField
              {...field}
              id="linkedinUrl"
              label=""
              type="text"
              placeholder="LinkedIn Profile URL"
              iconStart={<Linkedin className="w-4 h-4 text-gray-400" />}
            />
          )}
        />
      </motion.div>

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
          <span className="font-bold underline decoration-blue-200 underline-offset-2">PRO TIP:</span>{" "}
          Fill in all required fields marked with * to create a complete resume. Recruiters often verify these details first!
        </p>
      </motion.div>
    </motion.div>
  );
};