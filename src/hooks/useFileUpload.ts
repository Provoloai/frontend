import { useState } from "react";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
  MAX_FILE_COUNT,
} from "@/constants/liveChat";

export function useFileUpload() {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFileError("");

    // Validate files
    const validFiles: File[] = [];

    for (const file of files) {
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type as any)) {
        setFileError(`${file.name}: File type not allowed`);
        continue;
      }

      // Check file size (5MB per file)
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`${file.name}: Exceeds 5MB limit`);
        continue;
      }

      validFiles.push(file);
    }

    // Check total file count (max 5)
    const totalFiles = attachments.length + validFiles.length;
    if (totalFiles > MAX_FILE_COUNT) {
      setFileError("Maximum 5 files allowed");
      return;
    }

    // Check total size (10MB)
    const totalSize = [...attachments, ...validFiles].reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (totalSize > MAX_TOTAL_SIZE) {
      setFileError("Total file size exceeds 10MB");
      return;
    }

    setAttachments([...attachments, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
    setFileError("");
  };

  const clearAttachments = () => {
    setAttachments([]);
    setFileError("");
  };

  return {
    attachments,
    fileError,
    handleFileSelect,
    removeAttachment,
    clearAttachments,
  };
}

