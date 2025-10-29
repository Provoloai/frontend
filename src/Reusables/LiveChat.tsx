import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FormData, ChatTab } from "@/types/liveChat";
import { FAQs } from "@/constants/liveChat";
import { useTicketMutation } from "@/hooks/useTicketMutation";
import ChatHeader from "@/components/liveChat/ChatHeader";
import FAQAccordion from "@/components/liveChat/FAQAccordion";
import ContactForm from "@/components/liveChat/ContactForm";
import ChatTabs from "@/components/liveChat/ChatTabs";
import ChatToggleButton from "@/components/liveChat/ChatToggleButton";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ChatTab>("faqs");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const submitTicketMutation = useTicketMutation(() => {
    // Reset form after 3 seconds
    setTimeout(() => {
      submitTicketMutation.reset();
      handleReset();
    }, 3000);
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (attachments: File[]) => {
    submitTicketMutation.mutate({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      files: attachments,
    });
  };

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
              <ChatHeader onMinimize={() => setIsOpen(false)} />

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto bg-white">
                <AnimatePresence mode="wait">
                  {activeTab === "faqs" ? (
                    <FAQAccordion
                      faqs={FAQs}
                      openFaqId={openFaqId}
                      onToggleFaq={toggleFaq}
                    />
                  ) : (
                    <ContactForm
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                      isSubmitting={submitTicketMutation.isPending}
                      isSuccess={submitTicketMutation.isSuccess}
                      error={submitTicketMutation.error}
                      onReset={handleReset}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Tabs at Bottom */}
              <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Toggle Button */}
      <ChatToggleButton
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
    </>
  );
}
