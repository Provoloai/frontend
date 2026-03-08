import { motion } from "motion/react";
import { Medal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { learnHeaderVariants } from "@/constants/animations";
import type { LearnHeaderProps } from "@/types/learn";

const LearnHeader: React.FC<LearnHeaderProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
}) => {
  return (
    <motion.header className="text-start pt-20" variants={learnHeaderVariants}>
      <motion.h1
        className="text-3xl font-medium mb-3 flex items-center gap-3"
        variants={learnHeaderVariants}
      >
        {title} <Medal aria-hidden="true" />
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0"
        variants={learnHeaderVariants}
      >
        <p className="text-gray-400 sm:w-2/3">{description}</p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="h-fit mt-auto"
        >
          <Link
            to={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="h-fit mt-auto items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 ring-inset hover:bg-blue-100 hover:text-primary/90 transition-all duration-200 flex w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText}
          </Link>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default LearnHeader;
