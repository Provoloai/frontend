export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmitTicketData {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: File[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  title: string;
  data?: {
    messageId: string;
    attachmentsCount: number;
  };
  error?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export type ChatTab = "faqs" | "contact";

