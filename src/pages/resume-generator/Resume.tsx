import { ResumeEditor } from "@/components/resumeBuilder/ResumeEditor";
import { useResumeStore } from "@/stores/resumeStore";
import { FileText, ChevronRight, Upload, Linkedin, X, Plus } from "lucide-react";
import { useState } from "react";

export const Resume: React.FC = () => {
  const [step, setStep] = useState<'method' | 'builder'>('method');
  const [showModal, setShowModal] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const resetResume = useResumeStore((state) => state.resetResume);
  const loadFromJSON = useResumeStore((state) => state.loadFromJSON);

  const handleMethodSelect = (method: string) => {
    if (method === 'manual') {
      resetResume();
      setShowModal(false);
      setStep('builder');
    } else if (method === 'linkedin') {
      alert('LinkedIn integration requires OAuth setup. This is a demo placeholder.');
      setShowModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file');
      return;
    }

    setUploadError('');
    setShowModal(false);
    alert('PDF parsing requires a backend service. This is a demo placeholder.');
  };

  if (step === 'builder') {
    return <ResumeEditor />;
  }

  return (
    <div className="bg-gray-50 py-8 px-4 flex flex-col overflow-y-auto relative w-full">
      <div className="mx-auto p-6 sm:p-10 w-full">
        <div className="flex justify-between mb-6 pt-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-sm text-gray-600 mt-1">Create and manage your resumes</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </button>
        </div>

        {/* Empty State */}
        <div className="p-12 text-center flex flex-col items-center justify-center h-[50vh]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
            Get started by creating your first resume. Choose from multiple creation methods to get started quickly.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Resume
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Create New Resume</h2>
                <p className="text-sm text-gray-600 mt-0.5">Choose how you'd like to get started</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-3">
                {/* Manual Creation */}
                <div
                  onClick={() => handleMethodSelect('manual')}
                  className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Create from Scratch
                    </h3>
                    <p className="text-sm text-gray-600">
                      Build your resume manually with our guided step-by-step editor
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
                </div>

                {/* Upload Resume */}
                <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <Upload className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Upload Existing Resume
                    </h3>
                    <p className="text-sm text-gray-600">
                      Import your current resume (PDF) and customize it with our editor
                    </p>
                    {uploadError && (
                      <p className="text-xs text-red-600 mt-2">{uploadError}</p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-green-600 transition-colors" />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* LinkedIn Import */}
                <div
                  onClick={() => handleMethodSelect('linkedin')}
                  className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Import from LinkedIn
                    </h3>
                    <p className="text-sm text-gray-600">
                      Automatically populate your resume using your LinkedIn profile data
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <p className="text-xs text-gray-500 text-center">
                You can edit and customize your resume after creation
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};