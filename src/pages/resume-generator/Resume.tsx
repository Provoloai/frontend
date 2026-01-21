import { motion, AnimatePresence } from "motion/react";
import { ResumeEditor } from "@/components/resumeBuilder/ResumeEditor";
import CustomButton from "@/Reusables/CustomButton";
import { useResumeStore } from "@/stores/resumeStore";
import {
  FileText,
  ChevronRight,
  Upload,
  Linkedin,
  X,
  Plus,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import { useState } from "react";

export const Resume: React.FC = () => {
  const [step, setStep] = useState<"method" | "builder">("method");
  const [showModal, setShowModal] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  // Get resume management functions
  const resumes = useResumeStore((state) => state.resumes);
  const currentResumeId = useResumeStore((state) => state.currentResumeId);
  const createNewResume = useResumeStore((state) => state.createNewResume);
  const setCurrentResumeId = useResumeStore((state) => state.setCurrentResumeId);
  const deleteResume = useResumeStore((state) => state.deleteResume);
  // const resetResume = useResumeStore((state) => state.resetResume);
  // const loadFromJSON = useResumeStore((state) => state.loadFromJSON);
  

  const handleMethodSelect = (method: string) => {
    if (method === "manual") {
      const newId = createNewResume();
      setShowModal(false);
      setStep("builder");
    } else if (method === "linkedin") {
      alert(
        "LinkedIn integration requires OAuth setup. This is a demo placeholder."
      );
      setShowModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Please upload a PDF file");
      return;
    }

    setUploadError("");
    setShowModal(false);
    alert(
      "PDF parsing requires a backend service. This is a demo placeholder."
    );
  };

  const handleEditResume = (id: string) => {
    setCurrentResumeId(id);
    setStep("builder");
  };

  const handleDeleteResume = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      deleteResume(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  if (step === "builder") {
    return <ResumeEditor onBack={() => setStep("method")} />;
  }

  return (
    <div className="flex-1 h-screen bg-gray-50 overflow-y-auto pt-10">
      <div className="mx-auto p-6 sm:p-10 w-full">
        {/* Header - ALWAYS VISIBLE */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-sm text-gray-600 mt-1">
              Create and manage your resumes
            </p>
          </div>
          <div className="w-fit flex justify-end">
            <CustomButton
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              Create New Resume
            </CustomButton>
          </div>
        </div>

        {/* Content Area - Empty State OR Resume Cards */}
        {resumes.length === 0 ? (
          /* Empty State - Your Original SVG Design */
          <div className="p-12 text-center flex flex-col items-center justify-center h-[50vh]">
            <svg width="203" height="152" viewBox="0 0 203 152" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100.014 123.173C132.335 123.173 158.539 96.9689 158.539 64.5319C158.539 32.0948 132.22 5.89117 100.014 5.89117C67.6919 5.89117 41.4883 32.0948 41.4883 64.5319C41.4883 96.9689 67.6919 123.173 100.014 123.173Z" fill="#EAEEF9" />
              <path d="M165.968 45.9523C168.582 45.9523 170.701 43.8333 170.701 41.2194C170.701 38.6056 168.582 36.4866 165.968 36.4866C163.355 36.4866 161.236 38.6056 161.236 41.2194C161.236 43.8333 163.355 45.9523 165.968 45.9523Z" fill="#F1F3F9" />
              <path d="M172.894 27.4829C174.679 27.4829 176.126 26.0359 176.126 24.2508C176.126 22.4657 174.679 21.0186 172.894 21.0186C171.109 21.0186 169.662 22.4657 169.662 24.2508C169.662 26.0359 171.109 27.4829 172.894 27.4829Z" fill="#EAEEF9" />
              <path d="M44.1433 26.0921C45.9284 26.0921 47.3755 24.645 47.3755 22.8599C47.3755 21.0748 45.9284 19.6277 44.1433 19.6277C42.3582 19.6277 40.9111 21.0748 40.9111 22.8599C40.9111 24.645 42.3582 26.0921 44.1433 26.0921Z" fill="#EAEEF9" />
              <path d="M24.404 88.4269C27.7191 88.4269 30.4065 85.7395 30.4065 82.4243C30.4065 79.1092 27.7191 76.4218 24.404 76.4218C21.0888 76.4218 18.4014 79.1092 18.4014 82.4243C18.4014 85.7395 21.0888 88.4269 24.404 88.4269Z" fill="#EAEEF9" />
              <g filter="url(#filter0_d_567_20936)">
                <path d="M83.96 95.8298L37.5702 105.346C36.8921 105.452 36.27 105.099 36.1648 104.421L22.0182 35.1722C21.913 34.4941 22.2654 33.872 22.9435 33.7668L69.3333 24.2502C70.0114 24.145 70.6335 24.4974 70.7387 25.1755L84.961 94.4211C85.063 95.0235 84.6382 95.7246 83.96 95.8298Z" fill="url(#paint0_linear_567_20936)" />
              </g>
              <path d="M34.7841 68.5579L52.9355 64.8281" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M58.3458 63.7323L62.332 62.9135" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M67.1722 61.9141L71.1584 61.0953" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M35.7863 73.4695L53.9377 69.7398" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M59.3454 68.5722L63.3347 67.8251" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M68.1031 66.829L72.0893 66.0102" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36.7858 78.3099L54.9372 74.5802" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60.3477 73.4842L64.3339 72.6654" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M69.1021 71.6691L73.0883 70.8502" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M37.7854 83.1499L55.9399 79.4919" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40.6029 96.8164L45.7267 95.7329" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M39.874 93.2572L48.9871 91.4266" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M67.8738 89.7476L76.9152 87.9202" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M61.3472 78.3243L65.3334 77.5055" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M70.1051 76.581L74.0912 75.7622" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40.9174 42.2165C39.3546 42.5452 38.2644 43.8795 38.0842 45.506C38.0288 45.863 38.2858 46.1543 38.6262 46.2209C38.9666 46.2874 39.2374 46.0233 39.2929 45.6663C39.3968 44.6084 40.1815 43.6836 41.1817 43.4733C42.1819 43.2629 43.2587 43.7272 43.7938 44.7198C43.9883 45.0242 44.3426 45.1569 44.6274 44.9589C44.9121 44.7609 45.0301 44.3907 44.8355 44.0863C44.0016 42.604 42.4802 41.8879 40.9174 42.2165Z" fill="#989FB0" />
              <path d="M55.2597 39.2004C53.6969 39.529 52.6067 40.8634 52.4265 42.4898C52.371 42.8469 52.6281 43.1381 52.9685 43.2047C53.3089 43.2713 53.5797 43.0071 53.6352 42.6501C53.7391 41.5922 54.5238 40.6674 55.524 40.4571C56.5242 40.2468 57.6009 40.711 58.1361 41.7036C58.3306 42.0081 58.6849 42.1408 58.9697 41.9427C59.2544 41.7447 59.3724 41.3746 59.1778 41.0701C58.3439 39.5878 56.8225 38.8717 55.2597 39.2004Z" fill="#989FB0" />
              <path d="M45.7327 47.6407L46.6361 47.4437C47.7643 48.9448 49.916 49.1307 51.3325 47.9481C51.8973 47.5337 52.332 46.8565 52.4735 46.1705L53.3769 45.9734C53.0824 48.2944 50.8232 49.952 48.5565 49.5728C47.4926 49.368 46.4073 48.7312 45.7327 47.6407Z" fill="#989FB0" />
              <circle opacity="0.4" cx="60.2717" cy="47.7742" r="2.44265" transform="rotate(-11.8756 60.2717 47.7742)" fill="#D5DDEA" />
              <circle opacity="0.4" cx="39.7829" cy="52.0828" r="2.44265" transform="rotate(-11.8756 39.7829 52.0828)" fill="#D5DDEA" />
              <g filter="url(#filter1_d_567_20936)">
                <path d="M128.134 115.487L76.954 118.484C76.2156 118.561 75.6459 117.983 75.5691 117.245L71.1116 40.967C71.0348 40.2286 71.6128 39.6588 72.3512 39.5821L123.531 36.5854C124.269 36.5087 124.839 37.0866 124.916 37.825L129.373 114.103C129.368 114.84 128.872 115.411 128.134 115.487Z" fill="url(#paint1_linear_567_20936)" />
              </g>
              <path d="M93.5479 80.5991L118.127 79.1643" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M93.2998 76.1173L117.809 74.6821" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M93.7957 85.0806L118.375 83.6458" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M82.5602 90.1802L118.624 88.0573" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M82.8079 94.6618L103.425 93.409" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M83.6953 109.637L88.8072 109.324" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M83.5102 106.136L92.5437 105.571" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M110.61 104.509L119.573 104.013" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M111.314 108.93L120.277 108.434" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M83.0562 99.1436L118.872 97.0207" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M82.2998 103.625L107.014 102.198" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <g filter="url(#filter2_d_567_20936)">
                <path d="M194.925 80.2444L131.452 69.7278C130.64 69.5782 130.106 68.7795 130.256 67.9676L137.766 7.51099C137.916 6.69911 138.715 6.16494 139.526 6.31457L202.999 16.8312C203.811 16.9808 204.345 17.7795 204.196 18.5914L196.686 79.048C196.461 79.8599 195.737 80.394 194.925 80.2444Z" fill="url(#paint2_linear_567_20936)" />
              </g>
              <path d="M153.684 42.8701L181.936 47.5829" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M187.723 48.5078L192.034 49.2205" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M154.298 47.6578L182.549 52.3705" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M188.336 53.2203L192.647 53.933" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M154.911 52.3701L183.162 57.0829" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M188.949 57.9328L193.26 58.6455" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M155.524 57.1577L183.776 61.8704" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M161.647 70.4329L167.333 71.3331" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M160.796 65.8328L172.168 67.6205" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M189.563 62.5703L194.723 63.3581" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M178.579 71.9081L183.015 72.5832" stroke="#D5DDEA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M159.109 20.7329C157.297 20.4081 155.785 21.6675 155.535 23.5548C155.46 23.9493 155.754 24.2816 156.132 24.3191C156.51 24.3566 156.804 24.0993 156.879 23.7048C157.054 22.5954 158.047 21.7217 159.16 21.8842C160.273 22.0467 161.184 23.0275 161.196 24.1743C161.196 24.531 161.452 24.8259 161.792 24.8259C162.132 24.8259 162.389 24.531 162.389 24.1743C162.389 22.4995 161.013 21.058 159.109 20.7329Z" fill="#989FB0" />
              <path d="M174.137 22.7453C172.325 22.4205 170.813 23.6799 170.563 25.5672C170.488 25.9617 170.782 26.294 171.16 26.3315C171.538 26.369 171.832 26.1117 171.907 25.7172C172.082 24.6078 173.075 23.7341 174.188 23.8966C175.301 24.0591 176.212 25.0399 176.224 26.1867C176.224 26.5434 176.48 26.8383 176.82 26.8383C177.16 26.8383 177.417 26.5434 177.417 26.1867C177.417 24.5119 176.041 23.0704 174.137 22.7453Z" fill="#989FB0" />
              <path d="M165.809 28.8329L166.816 29.0078C167.604 30.6327 169.905 31.3203 171.547 30.3708C172.2 29.9951 172.709 29.3451 172.898 28.6076L173.905 28.7824C173.98 31.2452 171.847 33.2575 169.347 32.8068C168.172 32.5443 167.034 31.8192 166.289 30.6327L165.809 28.8329Z" fill="#989FB0" />
              <circle opacity="0.4" cx="182.841" cy="31.5452" r="2.68289" transform="rotate(10.6051 182.841 31.5452)" fill="#D5DDEA" />
              <circle opacity="0.4" cx="160.06" cy="28.12" r="2.68289" transform="rotate(10.6051 160.06 28.12)" fill="#D5DDEA" />
              <defs>
                <filter id="filter0_d_567_20936" x="17.9404" y="22.1855" width="71.0975" height="89.2891" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20936" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20936" result="shape" />
                </filter>
                <filter id="filter1_d_567_20936" x="67.0352" y="34.5166" width="66.4158" height="89.0391" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20936" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20936" result="shape" />
                </filter>
                <filter id="filter2_d_567_20936" x="126.172" y="4.26172" width="82.109" height="81.0625" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_567_20936" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_567_20936" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_567_20936" x1="53.6172" y1="20.1771" x2="53.0114" y2="105.208" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDFEFF" />
                  <stop offset="0.9964" stopColor="#ECF0F5" />
                </linearGradient>
                <linearGradient id="paint1_linear_567_20936" x1="100.526" y1="34.5112" x2="99.9202" y2="119.542" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDFEFF" />
                  <stop offset="0.9964" stopColor="#ECF0F5" />
                </linearGradient>
                <linearGradient id="paint2_linear_567_20936" x1="132.357" y1="13.9667" x2="162.449" y2="89.6274" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDFEFF" />
                  <stop offset="0.9964" stopColor="#ECF0F5" />
                </linearGradient>
              </defs>
            </svg>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Get started by creating your first resume. Choose from multiple
              creation methods to get started quickly.
            </p>
            <div className="w-fit flex justify-end">
            <CustomButton
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              Create New Resume
            </CustomButton>
          </div>
          </div>
        ) : (
          /* Resume Cards - Simple, Clean Design */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                >
                  {/* Resume Info */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
                      {resume.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate mb-2">
                      {resume.jobTitle || "No job title"}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatDate(resume.lastModified)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <div className="">
                      <div
                        onClick={() => handleEditResume(resume.id)}
                        className="btn-primary flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="px-3 py-2 border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal - Your Original Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
            onClick={(e: React.MouseEvent) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Create New Resume</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Choose your preferred method</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="space-y-2">
                  <div
                    onClick={() => handleMethodSelect("manual")}
                    className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-200 group"
                  >
                    <div className="shrink-0">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">Create from Scratch</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Build your resume manually with our guide</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                  </div>

                  <label className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-200 group">
                    <div className="shrink-0">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">Upload Existing PDF</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Import and edit your current resume</p>
                      {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                    <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <div
                    onClick={() => handleMethodSelect("linkedin")}
                    className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-200 group"
                  >
                    <div className="shrink-0">
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">Import from LinkedIn</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Quickly sync your profile data</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                <p className="text-[10px] text-gray-400 text-center">
                  You can further customize your resume later
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};