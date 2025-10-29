import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Paperclip,
  X,
  MessageCircle,
  Minimize2,
  ChevronDown,
  Home,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import BlackLogo from '../assets/svg/BlackLogo.svg'
// import { apiPost } from "@/utils/api.util";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitTicketData {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: File[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  title: string;
  data?: {
    messageId: string;
    attachmentsCount: number;
  };
  error?: string;
}

export default function LiveChat() {
  const url = `${import.meta.env.VITE_SERVER_URL}`;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"faqs" | "contact">("faqs");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");

  // TanStack Query mutation
  const submitTicketMutation = useMutation<
    ApiResponse,
    Error,
    SubmitTicketData
  >({
    mutationFn: async (data: SubmitTicketData) => {
      const formDataObj = new FormData();
      formDataObj.append("name", data.name);
      formDataObj.append("email", data.email);
      formDataObj.append("message", data.message);

      if (data.subject) {
        formDataObj.append("subject", data.subject);
      }

      data.files.forEach(file => {
        formDataObj.append("attachments", file);
      });

      const response = await fetch(`${url}/support/ticket`, {
        method: "POST",
        body: formDataObj,
      });

      // Get response text first
      const responseText = await response.text();

      // Try to parse as JSON
      let responseData: ApiResponse;
      try {
        responseData = responseText
          ? JSON.parse(responseText)
          : {
            success: false,
            message: "Empty response from server",
            title: "Server Error",
          };
      } catch (e) {
        throw new Error(
          `Invalid JSON response: ${responseText.substring(0, 100)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          responseData.message || `Server error: ${response.status}`
        );
      }

      return responseData;
    },
    onSuccess: () => {
      // Reset form after 3 seconds
      setTimeout(() => {
        submitTicketMutation.reset();
        setFormData({ name: "", email: "", subject: "", message: "" });
        setAttachments([]);
        setFileError("");
      }, 3000);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFileError("");

    // Validate files
    const validFiles: File[] = [];

    for (const file of files) {
      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain",
        "text/csv",
        "application/rtf",
        "video/mp4",
        "video/mpeg",
        "video/quicktime",
        "video/webm",
      ];

      if (!allowedTypes.includes(file.type)) {
        setFileError(`${file.name}: File type not allowed`);
        continue;
      }

      // Check file size (5MB per file)
      if (file.size > 5 * 1024 * 1024) {
        setFileError(`${file.name}: Exceeds 5MB limit`);
        continue;
      }

      validFiles.push(file);
    }

    // Check total file count (max 5)
    const totalFiles = attachments.length + validFiles.length;
    if (totalFiles > 5) {
      setFileError("Maximum 5 files allowed");
      return;
    }

    // Check total size (10MB)
    const totalSize = [...attachments, ...validFiles].reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (totalSize > 10 * 1024 * 1024) {
      setFileError("Total file size exceeds 10MB");
      return;
    }

    setAttachments([...attachments, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
    setFileError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitTicketMutation.mutate({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      files: attachments,
    });
  };

  const isFormValid = formData.name && formData.email && formData.message;

  const faqs = [
    {
      id: 1,
      question: "What is Provolo?",
      answer:
        "Provolo is an AI-powered tool helping freelancers stand out and land more clients through smarter profile optimization and AI-generated proposals. It analyzes your skills, writing tone, and past work to help you present a polished, high-converting freelance profile.",
    },
    {
      id: 2,
      question: "Can it help me write proposals for Upwork jobs?",
      answer:
        "Yes! Provolo includes an AI-powered proposal generator that helps you craft personalized, confident, and high-converting proposals tailored to each job post. You can also customize tone and structure before sending.",
    },
    {
      id: 3,
      question: "What if I don't know what my Upwork title or tags should be?",
      answer:
        "Provolo analyzes your experience and suggests optimized job titles, categories, and skill tags that align with what clients search for. This ensures your profile ranks better and attracts relevant opportunities.",
    },
    {
      id: 4,
      question: "Does Provolo only work for Upwork?",
      answer:
        "Currently, Provolo is optimized for Upwork. However, we’re actively working on expanding support to other platforms like Fiverr, Toptal, and Freelancer.com.",
    },
    {
      id: 5,
      question: "Is my data safe with Provolo?",
      answer:
        "Yes. We take privacy seriously. Your data is encrypted and never shared with third parties. All information you enter is stored securely and used solely to enhance your experience inside Provolo.",
    },
    {
      id: 6,
      question: "Can I edit or customize what the AI generates?",
      answer:
        "Of course! Everything Provolo generates is fully editable. You can tweak, rewrite, or personalize any section before saving or exporting — you’re always in control.",
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <div className="fixed bottom-16 right-4 md:bottom-16 md:right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] md:w-[25rem] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ height: "min(660px, calc(100vh - 120px))" }}
            >
              {/* Header */}
              <div className="bg-black px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <img src={BlackLogo} alt="Logo" />
                  </div>

                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>


              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto bg-white">
                <AnimatePresence mode="wait">
                  {activeTab === "faqs" ? (
                    <motion.div
                      key="faqs"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 sm:p-6 relative bg-gradient-to-b from-black via-white to-white"
                    >
                      <div className="">
                        <div className="my-6">
                          <h3 className="text-white font-semibold text-base sm:text-lg">
                            Need Help? 🤔
                          </h3>
                          <p className="text-white font-semibold text-sm sm:text-sm">We’re right here for you.</p>
                        </div>


                        {/* FAQ Accordion */}
                        <div className="space-y-3 mb-6">
                          {faqs.map(faq => (
                            <div
                              key={faq.id}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full text-left px-3 sm:px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between gap-2"
                              >
                                <span className="text-gray-700 text-xs sm:text-sm font-medium">
                                  {faq.question}
                                </span>
                                <motion.div
                                  animate={{
                                    rotate: openFaqId === faq.id ? 180 : 0,
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="flex-shrink-0"
                                >
                                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {openFaqId === faq.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-3 sm:px-4 py-3 bg-white text-gray-600 text-xs sm:text-sm">
                                      {faq.answer}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 sm:p-6 h-full"
                    >
                      <AnimatePresence mode="wait">
                        {submitTicketMutation.isSuccess ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="h-full flex flex-col items-center justify-center text-center"
                          >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                              Message Sent!
                            </h4>
                            <p className="text-gray-600 text-sm">
                              We’ve received your request, thank you for getting in touch!
                              Our support team will respond within 24 hours.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col h-full"
                          >
                            {/* Scrollable content area */}
                            <div className="flex-1 overflow-y-auto space-y-3  sm:space-y-4 p-1">
                              <section >
                                {/* Error Message */}
                                {submitTicketMutation.isError && (
                                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm">
                                    {submitTicketMutation.error?.message ||
                                      "Failed to send message. Please try again."}
                                  </div>
                                )}

                                {/* Name Input */}
                                <div>
                                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                    required
                                  />
                                </div>

                                {/* Email Input */}
                                <div className="my-3">
                                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="example@email.com"
                                    required
                                  />
                                </div>

                                {/* Subject Input */}
                                <div className="my-3">
                                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Email Subject
                                  </label>
                                  <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="What's this about?"
                                  />
                                </div>

                                {/* Description Input */}
                                <div>
                                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Message
                                  </label>
                                  <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all "
                                    placeholder="How can we help you?"
                                    required
                                  />
                                </div>

                              </section>
                            </div>

                            {/* Fixed Actions at bottom */}
                            <div className="flex-shrink-0 border-t border-gray-200 pt-3 mt-3 bg-white">
                              <div className="mb-2">

                                {/* File Error */}
                                {fileError && (
                                  <div className="text-red-500 text-xs">
                                    {fileError}
                                  </div>
                                )}

                                {/* Attachments */}
                                {attachments.length > 0 && (
                                  <div className="space-y-2">
                                    {attachments.map((file, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                                      >
                                        <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                                          <Paperclip className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                          <span className="text-xs sm:text-sm text-gray-700 truncate">
                                            {file.name}
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => removeAttachment(index)}
                                          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </motion.div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <label className="flex-shrink-0 cursor-pointer">
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.mp4,.mpeg,.mov,.webm"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    disabled={submitTicketMutation.isPending}
                                  />
                                  <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                                    <Paperclip className="w-5 h-5 text-gray-600" />
                                  </div>
                                </label>

                                <button
                                  type="submit"
                                  disabled={
                                    !isFormValid || submitTicketMutation.isPending
                                  }
                                  className="flex-1 bg-black text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                >
                                  {submitTicketMutation.isPending ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  ) : (
                                    <>
                                      <span>Send Message</span>
                                      <Send className="w-4 h-4" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tabs at Bottom */}
              <div className="flex border-t border-gray-200 bg-white flex-shrink-0">
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={`flex-1 py-3 sm:py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === "faqs"
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-xs font-medium">Home</span>
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex-1 py-3 sm:py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === "contact"
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-medium">Message</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button - Fixed position */}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-12 sm:h-12 bg-black rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow fixed bottom-4 right-4 z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
