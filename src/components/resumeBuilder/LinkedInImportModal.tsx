import { useState } from "react";
import { X, Linkedin, AlertCircle } from "lucide-react";
import CustomButton from "@/Reusables/CustomButton";

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => Promise<void>;
}

export const LinkedInImportModal = ({
  isOpen,
  onClose,
  onSubmit,
}: LinkedInImportModalProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a LinkedIn profile URL");
      return;
    }

    if (!url.includes("linkedin.com/in/")) {
      setError(
        "Please enter a valid LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)"
      );
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await onSubmit(url);
      setUrl("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to fetch LinkedIn profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Import Profile
              </h2>
              <p className="text-xs text-gray-500">
                Generate a resume from LinkedIn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label
              htmlFor="linkedin-url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              LinkedIn Profile URL
            </label>
            <input
              id="linkedin-url"
              type="url"
              value={url}
              onChange={e => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="https://www.linkedin.com/in/username"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              disabled={isLoading}
            />
            {error && (
              <div className="flex items-start gap-2 mt-3 text-red-600 bg-red-50 p-2.5 rounded-lg text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <CustomButton
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-black bg-gray-100 border border-transparent hover:bg-gray-200 transition-colors"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              disabled={isLoading || !url.trim()}
              isLoading={isLoading}
              loadingText="Fetching profile..."
              className="btn-primary flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm"
              style={{ minWidth: "140px" }}
            >
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <span>Import Profile</span>
              </span>
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};
