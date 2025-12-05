import { Construction } from "lucide-react";
import Header from "@/components/landing/Header";

export default function UnderMaintenance() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="p-6 rounded-lg text-center">
            <div className="w-full text-center flex justify-center">
              {/* Maintenance Icon */}
              <Construction size={100} className="text-[#195CEF]" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-5 text-gray-800">
              Under Maintenance
            </h1>

            <p className="text-center text-gray-600 lg:w-2/3 mx-auto text-sm mb-8">
              We're currently performing scheduled maintenance to improve your
              experience. We'll be back online shortly. Thank you for your
              patience.
            </p>

            {/* Action Buttons */}
            {/* <div className="flex flex-col sm:flex-col gap-4 items-center justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-6 py-3 rounded-md text-white text-sm hover:opacity-90 transition-opacity w-full max-w-xs"
              >
                Refresh Page
              </button>
            </div> */}

            {/* Animated dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {[0, 1, 2].map(index => (
                <div
                  key={index}
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
