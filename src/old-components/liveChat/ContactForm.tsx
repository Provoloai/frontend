import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Paperclip, X } from "lucide-react";
import { FormData } from "@/types/liveChat";
import { useFileUpload } from "@/hooks/useFileUpload";

interface ContactFormProps {
  formData: FormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (attachments: File[]) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: Error | null;
  onReset: () => void;
}

export default function ContactForm({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  isSuccess,
  error,
  onReset,
}: ContactFormProps) {
  const {
    attachments,
    fileError,
    handleFileSelect,
    removeAttachment,
    clearAttachments,
  } = useFileUpload();

  React.useEffect(() => {
    if (isSuccess) {
      clearAttachments();
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const isFormValid = formData.name && formData.email && formData.message;

  const fileAcceptString =
    "image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.mp4,.mpeg,.mov,.webm";

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="p-4 sm:p-6 h-full"
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
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
              We've received your request, thank you for getting in touch! Our
              support team will respond within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(attachments);
            }}
            className="flex flex-col h-full"
          >
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 p-1">
              <section>
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm">
                    {error.message || "Failed to send message. Please try again."}
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
                    onChange={onInputChange}
                    className="w-full px-3 sm:px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Nina Nonymous"
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                  <div className="text-red-500 text-xs">{fileError}</div>
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
                    accept={fileAcceptString}
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1 bg-black text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
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
  );
}

